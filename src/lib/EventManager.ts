/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EventManager {
  private listeners: Map<string, ((payload: any) => void)[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: (payload: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)!.forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: (payload: any) => void) {
    const listeners = this.listeners.get(event);

    if (!listeners) return;

    const filteredListeners = listeners.filter((l) => l !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }
}
