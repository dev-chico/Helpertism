import { FaGamepad, FaCalendarDay, FaEdit } from "react-icons/fa";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import { AuthenticatedPaths } from "../../constants/paths";
import { MenuItem } from "./components/MenuItem/MenuItem";
import styles from "./menu.module.css";

export function Menu() {
  function logout() {
    console.log("logout");
  }

  return (
    <aside className={styles.container}>
      <section>
        <MenuItem title="Jogos" path={AuthenticatedPaths.home}>
          <FaGamepad size={20} />
        </MenuItem>

        <MenuItem title="Atividades" path={AuthenticatedPaths.activities}>
          <FaCalendarDay size={20} />
        </MenuItem>

        <MenuItem title="Posts" path={AuthenticatedPaths.posts}>
          <FaEdit size={20} />
        </MenuItem>

        <MenuItem title="Meu perfil" path={AuthenticatedPaths.profile}>
          <FaUser size={20} />
        </MenuItem>
      </section>

      <MenuItem title="Sair" isLink={false} onclick={logout}>
        <FaArrowRightFromBracket size={20} />
      </MenuItem>
    </aside>
  );
}
