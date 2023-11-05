import EventManager from "../../lib/EventManager";

export const toastEventManager = new EventManager();

export interface IToast {
  type: "default" | "success" | "danger";
  text: string;
  duration?: number;
}

export function toast({ type, text, duration }: IToast) {
  toastEventManager.emit("addtoast", { type, text, duration });
}
