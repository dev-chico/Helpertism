import { useState, useEffect } from "react";
import { Modal, FormGroup } from "../../../../../components";
import { useAuth } from "../../../../../contexts/AuthContext";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { firebaseApp } from "../../../../../services/firebase";
import styles from "./editModal.module.css";
import { toast } from "../../../../../components/Toast/toast";

interface IEditModalProps {
  handleToggle: () => void;
  isOpen: boolean;
}

export function EditModal({ handleToggle, isOpen }: IEditModalProps) {
  const { user, setUser } = useAuth();
  const [name, setName] = useState<string | undefined>(user?.name);
  const [age, setAge] = useState<string>(String(user?.age));
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (!name?.length || !age.length || password.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, age, password]);

  async function handleEdit() {
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, "users", user!.uid!);

    try {
      const updatedData = {
        name,
        age: parseInt(age, 10),
        password,
      };

      await updateDoc(userRef, updatedData);

      handleToggle();
      setUser({
        age: Number(age)!,
        name: name!,
        email: user!.email!,
        uid: user!.uid!,
      });

      setPassword("");
      toast({
        duration: 3000,
        text: "Perfil editado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
      toast({
        duration: 3000,
        text: "Erro ao editar perfil!",
        type: "danger",
      });
    }
  }

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Editar"
      onCancel={handleToggle}
      onConfirm={handleEdit}
      title="Editar perfil"
      visible={isOpen}
      disableBtnConfirm={disabled}
    >
      <div className={styles.container}>
        <FormGroup
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome"
          placeholder="Nome"
        />
        <FormGroup
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="Idade"
          type="number"
          placeholder="8"
        />
        <FormGroup
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
          type="password"
          placeholder="********"
        />
      </div>
    </Modal>
  );
}
