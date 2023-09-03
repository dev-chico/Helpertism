import styles from "./info.module.css";

interface IInfoProps {
  title: string;
  content: string;
}

export function Info({ content, title }: IInfoProps) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <span>{content}</span>
    </div>
  );
}
