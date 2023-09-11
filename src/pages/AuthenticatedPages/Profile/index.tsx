import { useState } from "react";
import { Button } from "../../../components";
import { Info } from "./components/Info";
import styles from "./profile.module.css";
import { EditModal } from "./components/EditModal/EditModal";
import { DeleteAccountModal } from "./components/DeleteAccountModal/DeleteAccountModal";

export function Profile() {
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
        <Info title="Nome" content="Luis Antonio de Souza Silva" />
        <Info title="Email" content="dev.luis2003@gmail.com" />
        <Info title="Idade" content="20 anos" />
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
