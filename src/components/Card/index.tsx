import { ReactNode } from "react";
import styles from "./card.module.css";

export interface ICard {
  id: number;
  img: string;
  title: string;
  date?: string;
  description?: string;
  author_id?: string;
}

interface ICardProps extends ICard {
  children: ReactNode;
}

export function Card({
  children,
  title,
  date,
  description,
  img,
  id,
}: ICardProps) {
  console.log("ID: ", id);
  return (
    <div className={styles.container}>
      <img src={img} className={styles.img} />

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
