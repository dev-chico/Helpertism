import { InputHTMLAttributes } from "react";
import styles from "./input.module.css";

export function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.input}`} {...props} />;
}
