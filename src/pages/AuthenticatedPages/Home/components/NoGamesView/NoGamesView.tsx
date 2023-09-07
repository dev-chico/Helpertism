import { Link } from "react-router-dom";
import bear from "../../../../../assets/imgs/bear.jpg";
import styles from "./noGamesView.module.css";

export function NoGamesView() {
  return (
    <div className={styles.container}>
      <div className={styles.noData}>
        <Link to="/" className={styles.createGameLink}>
          Crie seu primeiro jogo
        </Link>
        <div className={styles.icons}>😁💙</div>
      </div>

      <img
        src={bear}
        className={styles.firstBearImg}
        alt="imagem de um urso azul"
      />

      <img
        src={bear}
        className={styles.secondBearImg}
        alt="imagem de um urso azul"
      />
    </div>
  );
}
