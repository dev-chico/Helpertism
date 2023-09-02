// import { Link } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./menuItem.module.css";

interface IMenuItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  return (
    <div className={styles.container}>
      {isLink ? (
        <a href={path} className={styles.menuItem}>
          {children}
        </a>
      ) : (
        <button onClick={onclick} className={styles.menuItem}>
          {children}
        </button>
      )}

      <p className={styles.tooltip}>{title}</p>
    </div>
  );
}
