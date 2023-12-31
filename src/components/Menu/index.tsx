import { FaGamepad, FaCalendarDay, FaEdit } from "react-icons/fa";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import { AuthenticatedPaths } from "../../constants/paths";
import { MenuItem } from "./components/MenuItem/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./menu.module.css";

export function Menu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className={styles.container}>
      <section>
        <MenuItem title="Jogos" path={AuthenticatedPaths.home}>
          <FaGamepad size={20} />
        </MenuItem>

        <MenuItem title="Tarefas" path={AuthenticatedPaths.activities}>
          <FaCalendarDay size={20} />
        </MenuItem>

        <MenuItem title="Posts" path={AuthenticatedPaths.posts.home}>
          <FaEdit size={20} />
        </MenuItem>

        <MenuItem title="Meu perfil" path={AuthenticatedPaths.profile}>
          <FaUser size={20} />
        </MenuItem>
      </section>

      <div className={styles.btnLogout}>
        <MenuItem title="Sair" isLink={false} onclick={handleLogout}>
          <FaArrowRightFromBracket size={20} />
        </MenuItem>
      </div>
    </aside>
  );
}
