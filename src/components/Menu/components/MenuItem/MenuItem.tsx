import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./menuItem.module.css";

interface IMenuItemProps {
  children: ReactNode;
  title: string;
  isLink?: boolean;
  path?: string;
  onclick?: () => void;
}

export function MenuItem({
  children,
  isLink = true,
  path = "/",
  title,
  onclick,
}: IMenuItemProps) {
  const { pathname } = useLocation();
  const isActualPage = pathname === path;

  return (
    <div className={styles.container}>
      {isLink ? (
        <Link
          to={path}
          className={`${styles.menuItem} ${isActualPage && styles.actualPage}`}
        >
          {children}
        </Link>
      ) : (
        <button onClick={onclick} className={styles.menuItem}>
          {children}
        </button>
      )}

      <p className={styles.tooltip}>{title}</p>
    </div>
  );
}
