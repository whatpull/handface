/**
 * Web Worker for HuggingFace transformers.js inference.
 * Runs model loading + text generation OFF the main thread so the
 * 3D animation never freezes.
 *
 * Communication protocol (postMessage):
 *   Main → Worker:
 *     { type: 'load' }
 *     { type: 'generate', prompt, options }
 *   Worker → Main:
 *     { type: 'load-progress', progress, file }
 *     { type: 'load-done', modelId }
 *     { type: 'load-error', error }
 *     { type: 'generate-done', text }
 *     { type: 'generate-error', error }
 */

const MODEL_CANDIDATES = [
  'onnx-community/Qwen2.5-0.5B-Instruct',   // Korean + multilingual, best quality
  'Xenova/Qwen2.5-0.5B-Instruct',            // alternate location
  'Xenova/distilgpt2',                         // fallback, English only
];

let generator = null;
let loadedModel = '';

self.onmessage = async (e) => {
  const { type } = e.data;

  if (type === 'load') {
    try {
      const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3');
      env.allowLocalModels = false;

      for (const modelId of MODEL_CANDIDATES) {
        try {
          self.postMessage({ type: 'load-progress', progress: 0, file: `Trying ${modelId}...` });
          generator = await pipeline('text-generation', modelId, {
            progress_callback: (p) => {
              if (p.status === 'progress' && p.progress != null) {
                self.postMessage({ type: 'load-progress', progress: Math.round(p.progress), file: p.file || modelId });
              }
            },
          });
          loadedModel = modelId;
          self.postMessage({ type: 'load-done', modelId });
          return;
        } catch {
          self.postMessage({ type: 'load-progress', progress: 0, file: `${modelId} unavailable` });
        }
      }
      self.postMessage({ type: 'load-error', error: 'No model could be loaded.' });
    } catch (err) {
      self.postMessage({ type: 'load-error', error: err.message });
    }
  }

  if (type === 'generate') {
    if (!generator) {
      self.postMessage({ type: 'generate-error', error: 'Model not loaded' });
      return;
    }
    try {
      const output = await generator(e.data.prompt, {
        max_new_tokens: 40,
        temperature: 0.8,
        do_sample: true,
        return_full_text: false,
        repetition_penalty: 1.3,
        no_repeat_ngram_size: 3,
        ...e.data.options,
      });

      let text = '';
      const gen = output?.[0]?.generated_text;
      if (typeof gen === 'string') {
        text = gen.split('\n')[0].replace(/^(AI|Assistant|assistant):?\s*/i, '').trim();
      } else if (Array.isArray(gen)) {
        const last = gen[gen.length - 1];
        text = (last?.content || last?.text || '').trim();
      }
      self.postMessage({ type: 'generate-done', text: text || '(thinking...)' });
    } catch (err) {
      self.postMessage({ type: 'generate-error', error: err.message });
    }
  }
};
