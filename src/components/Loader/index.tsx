import styles from "./loader.module.css";

interface ILoader {
  small?: boolean;
}

export function Loader({ small = false }: ILoader) {
  return (
    <div className={`${styles.container} ${small && styles.small}`}>
      <div className={styles.loader}></div>
      {!small && <p>Carregando..</p>}
    </div>
  );
}
