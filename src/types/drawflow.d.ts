declare module 'drawflow' {
  // drawflow ships as a UMD class with no built-in types — declare the surface we use.
  interface DrawflowNode {
    id: number;
    pos_x: number;
    pos_y: number;
    [k: string]: unknown;
  }
  export default class Drawflow {
    constructor(container: HTMLElement);
    reroute: boolean;
    reroute_fix_curvature: boolean;
    curvature: number;
    zoom: number;
    zoom_min: number;
    zoom_max: number;
    zoom_value: number;
    line_path: number;
    draggable_inputs: boolean;
    force_first_input: boolean;
    editor_mode: 'view' | 'edit';
    canvas_x: number;
    canvas_y: number;
    container: HTMLElement;
    precanvas: HTMLElement;
    start(): void;
    clear(): void;
    addNode(
      name: string, inputs: number, outputs: number,
      x: number, y: number, classoverride: string,
      data: Record<string, unknown>, html: string, typenode: boolean
    ): number;
    addConnection(out_id: number, in_id: number, out_class: string, in_class: string): void;
    removeNodeId(id: string): void;
    getNodeFromId(id: number): DrawflowNode | null;
    updateConnectionNodes(id: string): void;
    zoom_refresh(): void;
    on(event: string, cb: (id: number) => void): void;
  }
}
