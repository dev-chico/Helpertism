import { ReactNode } from "react";
import { Button } from "../Button";
import { ReactPortal } from "../ReactPortal";
import styles from "./modal.module.css";

interface IModalProps {
  title: string;
  children: ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  isLoading: boolean;
}

export function Modal({
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}: IModalProps) {
  if (!visible) return null;

  return (
    <ReactPortal containerId="modal-root">
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.modalBody}>{children}</div>

          <footer>
            <Button onClick={onCancel} disabled={isLoading} bgColor="red">
              {cancelLabel}
            </Button>
            <Button onClick={onConfirm}>{confirmLabel}</Button>
          </footer>
        </div>
      </div>
    </ReactPortal>
  );
}
