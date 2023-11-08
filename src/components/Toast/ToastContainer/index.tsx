import { useCallback, useEffect, useState } from "react";
import { IMessage, ToastMessage } from "../ToastMessage";
import { IToast, toastEventManager } from "../toast";
import styles from "./toastContainer.module.css";

export function ToastContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  useEffect(() => {
    function handleAddToast({ type, text, duration, position }: IToast) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);

      if (position) setPosition(position);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((m) => m.id !== id));
  }, []);

  return (
    <div
      className={`${styles.container} ${styles[position]}`}
      tabIndex={0}
      role="button"
    >
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  );
}
