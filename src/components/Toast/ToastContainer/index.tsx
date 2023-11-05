import { useCallback, useEffect, useState } from "react";
import { IMessage, ToastMessage } from "../ToastMessage";
import { IToast, toastEventManager } from "../toast";
import styles from "./toastContainer.module.css";

export function ToastContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: IToast) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
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
    <div className={styles.container} tabIndex={0} role="button">
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
