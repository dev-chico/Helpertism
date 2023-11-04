import { ReactNode } from "react";
import defaultImg from "../../assets/imgs/cards/bg-1.png";
import defaultImg2 from "../../assets/imgs/cards/bg-2.png";
import defaultImg3 from "../../assets/imgs/cards/bg-3.png";
import defaultImg4 from "../../assets/imgs/cards/bg-5.png";
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
  const defaultImages = [defaultImg, defaultImg2, defaultImg3, defaultImg4];
  const randomDefaultImg =
    defaultImages[Math.floor(Math.random() * defaultImages.length)];
  const imageSource = img || randomDefaultImg;

  return (
    <div className={`${styles.container} ${uid}`}>
      <img src={imageSource} className={styles.img} />

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
