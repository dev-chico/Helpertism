import { Button } from "../../../components";
import { Info } from "./components/Info";
import styles from "./profile.module.css";

export function Profile() {
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
        <Button>Editar perfil</Button>
        <Button bgColor="red" small>
          Deletar conta
        </Button>
      </div>
    </div>
  );
}
