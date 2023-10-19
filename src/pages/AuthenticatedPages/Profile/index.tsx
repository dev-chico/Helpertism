import { useState } from "react";
import { Button } from "../../../components";
import { Info } from "./components/Info";
import { EditModal } from "./components/EditModal/EditModal";
import { DeleteAccountModal } from "./components/DeleteAccountModal/DeleteAccountModal";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./profile.module.css";

export function Profile() {
  const { user } = useAuth();
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

  function handleToggleModalEdit() {
    setIsModalEditOpen((state) => !state);
  }

  function handleToggleModalDelete() {
    setIsModalDeleteOpen((state) => !state);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Meu perfil</h1>
      </header>

      <main>
        <Info title="Nome" content={user?.name} />
        <Info title="Email" content={user?.email} />
        <Info title="Idade" content={user?.age} />
      </main>

      <div className={styles.buttonsContainer}>
        <Button onClick={handleToggleModalEdit}>Editar perfil</Button>
        <Button bgColor="red" small onClick={handleToggleModalDelete}>
          Deletar conta
        </Button>
      </div>

      <EditModal
        handleToggle={handleToggleModalEdit}
        isOpen={isModalEditOpen}
      />
      <DeleteAccountModal
        handleToggle={handleToggleModalDelete}
        isOpen={isModalDeleteOpen}
      />
    </div>
  );
}
