import { ReactNode } from "react";
import styles from "./card.module.css";

import bg1 from "../../assets/imgs/cards/bg-1.png";

interface ICardProps {
  title: string;
  date?: string;
  description?: string;
  children: ReactNode;
}

export function Card({ children, title, date, description }: ICardProps) {
  return (
    <div className={styles.container}>
      <img src={bg1} className={styles.img} />

      <main>
        <div>
          <h3>{title}</h3>
          {date && <span className={styles.date}>{date}</span>}
        </div>
        {description && <p className={styles.description}>{description}</p>}

        <footer>{children}</footer>
      </main>
    </div>
  );
}
