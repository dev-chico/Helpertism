import { useState } from "react";
import { FaBars, FaGamepad, FaCalendarDay, FaEdit } from "react-icons/fa";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AuthenticatedPaths } from "../../constants/paths";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./menuMobile.module.css";

export function MenuMobile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  function handleLogout() {
    logout();
    navigate("/");
    setIsOpenMenu(false);
  }

  function handleToggleMenu() {
    setIsOpenMenu((state) => !state);
  }

  function handleNavigate(path: string) {
    navigate(path);
    setIsOpenMenu(false);
  }

  return (
    <div className={styles.container}>
      <button onClick={handleToggleMenu}>
        <FaBars size={28} color="var(--dark-blue)" />
      </button>

      <ul className={`${styles.list} ${isOpenMenu && styles.open}`}>
        <li>
          <a onClick={() => handleNavigate(AuthenticatedPaths.home)}>
            <FaGamepad size={24} />
            <span>Jogos</span>
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigate(AuthenticatedPaths.activities)}>
            <FaCalendarDay size={24} />
            <span>Tarefas</span>
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigate(AuthenticatedPaths.posts.home)}>
            <FaEdit size={24} />
            <span>Posts</span>
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigate(AuthenticatedPaths.profile)}>
            <FaUser size={24} />
            <span>Perfil</span>
          </a>
        </li>
        <li className={styles.btnLogout}>
          <a onClick={handleLogout}>
            <FaArrowRightFromBracket size={24} />
            <span>Sair</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
