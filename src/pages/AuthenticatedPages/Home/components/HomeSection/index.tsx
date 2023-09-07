import { ReactNode } from "react";
import styles from "./homeSection.module.css";

interface IHomeSectionProps {
  title: string;
  children: ReactNode;
}

export function HomeSection({ children, title }: IHomeSectionProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <main className={styles.content}>{children}</main>
    </section>
  );
}
