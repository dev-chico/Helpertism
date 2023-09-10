import { Link } from "react-router-dom";
import bear from "../../assets/imgs/bear.jpg";
import styles from "./noDataView.module.css";

interface INoDataViewProps {
  text: string;
}

export function NoDataView({ text }: INoDataViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.noData}>
        <Link to="/" className={styles.createGameLink}>
          {text}
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
