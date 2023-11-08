import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  bgColor?: "blue" | "red" | "gray" | "white" | "orange" | "green";
  rounded?: boolean;
  small?: boolean;
  className?: string;
}

export function Button({
  children,
  rounded = true,
  bgColor = "blue",
  small = false,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.defaultButton} ${styles[bgColor]} ${
        rounded && styles.rounded
      } ${small && styles.small} ${className}`}
    >
      {children}
    </button>
  );
}
