import { Link } from "react-router-dom";
import { AuthenticatedPaths } from "../../../../../../constants/paths";
import { Button } from "../../../../../../components";
import styles from "./endGame.module.css";

export function EndGameEasy() {
  return (
    <section className={styles.container}>
      <div className={styles.texts}>
        <h1 className={styles.title}>Fim de jogo! 😁💙</h1>
        <p>Parabéns! Você foi muito bom 🎊</p>
      </div>

      <Link to={AuthenticatedPaths.home}>
        <Button>Continuar</Button>
      </Link>
    </section>
  );
}
