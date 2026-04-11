type Listener<T> = (event: T) => void;

export class EventEmitter<EventMap extends Record<string, unknown>> {
  private _listeners = new Map<keyof EventMap, Set<Listener<unknown>>>();

  on<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>): this {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event)!.add(listener as Listener<unknown>);
    return this;
  }

  off<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>): this {
    this._listeners.get(event)?.delete(listener as Listener<unknown>);
    return this;
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    this._listeners.get(event)?.forEach((fn) => fn(data));
  }

  removeAllListeners(event?: keyof EventMap): this {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
    return this;
  }
}
