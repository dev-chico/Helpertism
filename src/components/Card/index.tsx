import { ReactNode } from "react";
import styles from "./card.module.css";

export interface ICard {
  uid: string;
  img?: string;
  title: string;
  text?: string;
  date: string;
  description?: string;
  userId?: string;
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
  uid,
}: ICardProps) {
  console.log("ID: ", uid);
  return (
    <div className={styles.container}>
      <img src={img} className={styles.img} />

      <main>
        <div>
          <h3>{title}</h3>
          {date && (
            <span className={styles.date}>
              {new Date(date).toLocaleDateString()}
            </span>
          )}
        </div>
        {description && <p className={styles.description}>{description}</p>}

        <footer>{children}</footer>
      </main>
    </div>
  );
}
