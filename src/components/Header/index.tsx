import logo from "../../assets/imgs/logo.png";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo da plataforma escrito Helpertism" />
    </header>
  );
}
