import { Modal } from "../../../../../components";
import { useAuth } from "../../../../../contexts/AuthContext";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../../services/firebase";
import styles from "./deleteAccountModal.module.css";

interface IDeleteAccountModalProps {
  handleToggle: () => void;
  isOpen: boolean;
}

export function DeleteAccountModal({
  handleToggle,
  isOpen,
}: IDeleteAccountModalProps) {
  const { user, setUser } = useAuth();
  const db = getFirestore(firebaseApp);
  const userRef = doc(db, "users", user!.uid!);

  async function handleDelete() {
    try {
      await deleteDoc(userRef);

      setUser(null);
      localStorage.removeItem("helpertism-user");

      handleToggle();
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
    }
  }

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Deletar"
      onCancel={handleToggle}
      onConfirm={handleDelete}
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
