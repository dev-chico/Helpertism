import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <main>
        <FaExclamationCircle size={80} />
        <h1>Ops... Página não encontrada! ☹️</h1>
      </main>

      <Link to="/">Voltar para página inicial</Link>
    </div>
  );
}
