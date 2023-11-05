import { useEffect } from "react";
import xCircle from "../../../assets/imgs/x-circle.svg";
import checkCircle from "../../../assets/imgs/check-circle.svg";
import styles from "./toastMessage.module.css";

export interface IMessage {
  id: number;
  text: string;
  type: "default" | "success" | "danger";
  duration?: number;
}

interface IToastMessage {
  message: IMessage;
  onRemoveMessage: (id: number) => void;
}

export function ToastMessage({ message, onRemoveMessage }: IToastMessage) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <div
      className={`${styles.container} ${
        message.type === "danger"
          ? styles.danger
          : message.type === "success"
          ? styles.success
          : ""
      }`}
      onClick={handleRemoveToast}
    >
      {message.type === "danger" && <img src={xCircle} alt="X" />}
      {message.type === "success" && <img src={checkCircle} alt="Check" />}
      <strong>{message.text}</strong>
    </div>
  );
}
