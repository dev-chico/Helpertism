import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  bgColor?: "blue" | "red" | "gray" | "white" | "orange";
  rounded?: boolean;
  small?: boolean;
}

export function Button({
  children,
  rounded = true,
  bgColor = "blue",
  small = false,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.defaultButton} ${styles[bgColor]} ${
        rounded && styles.rounded
      } ${small && styles.small}`}
    >
      {children}
    </button>
  );
}
