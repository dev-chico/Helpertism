import { ReactNode } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import styles from "./pageLayout.module.css";

interface IPageLayoutProps {
  children?: ReactNode;
}

export function PageLayout({ children }: IPageLayoutProps) {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <Header />
      </section>

      <section className={styles.menu}>
        <Menu />
      </section>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
