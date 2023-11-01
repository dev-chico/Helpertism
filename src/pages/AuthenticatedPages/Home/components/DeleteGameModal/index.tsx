import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../../services/firebase";
import { Modal } from "../../../../../components";
import styles from "./deleteGameModal.module.css";

interface IDeletePostModalProps {
  handleToggle: () => void;
  isOpen: boolean;
  uid: string;
}

export function DeleteGameModal({
  handleToggle,
  isOpen,
  uid,
}: IDeletePostModalProps) {
  async function handleDelete() {
    const db = getFirestore(firebaseApp);
    const postRef = doc(db, "games", uid);
    try {
      await deleteDoc(postRef);
      handleToggle();
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  }

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Deletar"
      onCancel={handleToggle}
      onConfirm={handleDelete}
      title="Deletar jogo"
      visible={isOpen}
    >
      <div className={styles.container}>
        <h2>
          Deseja <span style={{ color: "var(--red)" }}>deletar</span> seu jogo?
        </h2>
      </div>
    </Modal>
  );
}
