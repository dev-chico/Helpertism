import { ReactNode } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import styles from "./pageLayout.module.css";

interface IPageLayoutProps {
  children?: ReactNode;
}

export function PageLayout({ children }: IPageLayoutProps) {
  const viewSize = window.innerWidth;
  return (
    <div className={`${styles.container} ${viewSize < 900 && styles.mobile}`}>
      <section className={styles.header}>
        <Header />
      </section>

      {viewSize > 900 && (
        <section className={styles.menu}>
          <Menu />
        </section>
      )}

      <main className={styles.content}>{children}</main>
    </div>
  );
}
