import { MenuMobile } from "../MenuMobile";
import logo from "../../assets/imgs/logo.png";
import styles from "./header.module.css";

export function Header() {
  const viewSize = window.innerWidth;

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo da plataforma escrito Helpertism" />

      {viewSize < 900 && <MenuMobile />}
    </header>
  );
}
