// Session 33 drawflow PoC: region custom node template.

export function regionNodeHtml(region) {
  return `
    <div class="snn-canvas-region snn-canvas-region--${region.id.toLowerCase()}">
      <div class="snn-canvas-region-header">
        <span class="snn-canvas-region-label">${region.label}</span>
        <span class="snn-canvas-region-total">${region.total}</span>
      </div>
      <div class="snn-canvas-region-body">
        <div class="snn-canvas-region-active" id="snn-canvas-active-${region.id}">0</div>
        <div class="snn-canvas-region-active-label">active</div>
      </div>
    </div>
  `;
}
