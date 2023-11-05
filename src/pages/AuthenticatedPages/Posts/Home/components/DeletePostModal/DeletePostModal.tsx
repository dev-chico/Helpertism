import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../../../services/firebase";
import { Modal } from "../../../../../../components";
import styles from "./deletePostModal.module.css";
import { toast } from "../../../../../../components/Toast/toast";

interface IDeletePostModalProps {
  handleToggle: () => void;
  isOpen: boolean;
  uid: string;
}

export function DeletePostModal({
  handleToggle,
  isOpen,
  uid,
}: IDeletePostModalProps) {
  async function handleDelete() {
    const db = getFirestore(firebaseApp);
    const postRef = doc(db, "posts", uid);
    try {
      await deleteDoc(postRef);
      handleToggle();
      toast({
        text: "Post deletado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast({
        text: "Erro ao deletar post!",
        type: "danger",
      });
    }
  }

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Deletar"
      onCancel={handleToggle}
      onConfirm={handleDelete}
      title="Deletar post"
      visible={isOpen}
    >
      <div className={styles.container}>
        <h2>
          Deseja <span style={{ color: "var(--red)" }}>deletar</span> seu post?
        </h2>
      </div>
    </Modal>
  );
}
