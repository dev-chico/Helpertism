import { Link } from "react-router-dom";
import { Button } from "..";
import styles from "./footerCreate.module.css";

interface IFooterCreate {
  pathToCancel: string;
  onConfirm: () => void;
  disabled: boolean;
}

export function FooterCreate({
  pathToCancel,
  onConfirm,
  disabled,
}: IFooterCreate) {
  return (
    <footer className={styles.footer}>
      <Link to={pathToCancel}>
        <Button bgColor="red" small>
          Cancelar
        </Button>
      </Link>
      <Button bgColor="blue" disabled={disabled} small onClick={onConfirm}>
        Salvar
      </Button>
    </footer>
  );
}
