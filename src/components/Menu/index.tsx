import { FaGamepad, FaCalendarDay, FaEdit } from "react-icons/fa";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import { MenuItem } from "./components/MenuItem/MenuItem";
import styles from "./menu.module.css";

export function Menu() {
  return (
    <aside className={styles.container}>
      <section>
        <MenuItem title="Jogos">
          <FaGamepad size={20} />
        </MenuItem>

        <MenuItem title="Atividades">
          <FaCalendarDay size={20} />
        </MenuItem>

        <MenuItem title="Posts">
          <FaEdit size={20} />
        </MenuItem>

        <MenuItem title="Meu perfil">
          <FaUser size={20} />
        </MenuItem>
      </section>

      <MenuItem title="Sair">
        <FaArrowRightFromBracket size={20} />
      </MenuItem>
    </aside>
  );
}
