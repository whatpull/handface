// Session 33 drawflow PoC: region custom node template.
// Session 36: ComfyUI/Weavy 정합 card style (header + body + ports).

export function regionNodeHtml(region) {
  return `
    <div class="snn-canvas-region snn-canvas-region--${region.id.toLowerCase()}">
      <div class="snn-canvas-region-header">
        <span class="snn-canvas-region-dot"></span>
        <span class="snn-canvas-region-label">${region.label}</span>
        <span class="snn-canvas-region-menu">···</span>
      </div>
      <div class="snn-canvas-region-body">
        <div class="snn-canvas-region-row">
          <span class="snn-canvas-region-row-label">total</span>
          <span class="snn-canvas-region-row-value">${region.total}</span>
        </div>
        <div class="snn-canvas-region-row">
          <span class="snn-canvas-region-row-label">active</span>
          <span class="snn-canvas-region-row-value snn-canvas-region-active" id="snn-canvas-active-${region.id}">0</span>
        </div>
      </div>
    </div>
  `;
}
