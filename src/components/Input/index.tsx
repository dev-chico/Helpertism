import { InputHTMLAttributes } from "react";
import styles from "./input.module.css";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  small?: boolean;
}

export function Input({ small, ...props }: IInputProps) {
  return (
    <input className={`${styles.input} ${small && styles.small}`} {...props} />
  );
}
