import { FaGamepad, FaCalendarDay, FaEdit } from "react-icons/fa";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import { AuthenticatedPaths } from "../../constants/paths";
import { MenuItem } from "./components/MenuItem/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";

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

        <MenuItem title="Atividades" path={AuthenticatedPaths.activities}>
          <FaCalendarDay size={20} />
        </MenuItem>

        <MenuItem title="Posts" path={AuthenticatedPaths.posts.home}>
          <FaEdit size={20} />
        </MenuItem>

        <MenuItem title="Meu perfil" path={AuthenticatedPaths.profile}>
          <FaUser size={20} />
        </MenuItem>
      </section>

      <MenuItem title="Sair" isLink={false} onclick={handleLogout}>
        <FaArrowRightFromBracket size={20} />
      </MenuItem>
    </aside>
  );
}
