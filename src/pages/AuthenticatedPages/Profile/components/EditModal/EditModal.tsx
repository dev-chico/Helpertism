import { useState } from "react";
import { Modal } from "../../../../../components";
import { FormGroup } from "../../../../../components/FormGroup";
import styles from "./editModal.module.css";

interface IEditModalProps {
  handleToggle: () => void;
  isOpen: boolean;
}

export function EditModal({ handleToggle, isOpen }: IEditModalProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  return (
    <Modal
      cancelLabel="Cancelar"
      confirmLabel="Editar"
      onCancel={handleToggle}
      onConfirm={handleToggle}
      title="Editar perfil"
      visible={isOpen}
    >
      <div className={styles.container}>
        <FormGroup
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome"
          placeholder="Nome"
        />
        <FormGroup
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail"
          placeholder="E-mail"
        />
        <FormGroup
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="Idade"
          type="number"
          placeholder="8"
        />
      </div>
    </Modal>
  );
}
