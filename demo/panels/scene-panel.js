/**
 * scene-panel — wraps the existing handface scene as a T_viz panel (D16, P1-패널화).
 *
 * scene.js is left untouched: it does heavy module-level setup (DOM refs,
 * NeuronFace settings UI, MediaPipe init on START) so we lazy-import it the
 * first time this panel mounts. After that, mount/unmount only toggles the
 * #scene-root container's display — MediaPipe stream + animation loop keep
 * running through panel switches, which is the explicit MediaPipe-preserving
 * behavior D16 calls for.
 */

let _initialized = false;

export const scenePanel = {
  id: 'scene',
  label: 'Scene',

  async mount(_host) {
    const root = document.getElementById('scene-root');
    if (!root) {
      throw new Error('[scene-panel] #scene-root missing in DOM');
    }
    root.style.display = '';

    if (!_initialized) {
      _initialized = true;
      await import('../scene.js');
    }
  },

  unmount() {
    const root = document.getElementById('scene-root');
    if (!root) return;
    root.style.display = 'none';
  },
};
