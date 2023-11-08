import EventManager from "../../lib/EventManager";

export const toastEventManager = new EventManager();

export interface IToast {
  type: "default" | "success" | "danger";
  text: string;
  duration?: number;
  position?: "top" | "bottom";
}

export function toast({ type, text, duration, position }: IToast) {
  toastEventManager.emit("addtoast", { type, text, duration, position });
}
