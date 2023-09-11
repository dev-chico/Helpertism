import { Modal } from "../../../../../components";
import styles from "./deleteAccountModal.module.css";

interface IDeleteAccountModalProps {
  handleToggle: () => void;
  isOpen: boolean;
}

export function DeleteAccountModal({
  handleToggle,
  isOpen,
}: IDeleteAccountModalProps) {
  function handleDeleteModal() {
    console.log("Deletar");
  }

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Deletar"
      onCancel={handleToggle}
      onConfirm={handleDeleteModal}
      title="Deletar conta"
      visible={isOpen}
    >
      <div className={styles.container}>
        <h2>
          Deseja <span style={{ color: "var(--red)" }}>deletar</span> sua conta?
        </h2>
      </div>
    </Modal>
  );
}
