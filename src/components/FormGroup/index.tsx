import { InputHTMLAttributes } from "react";
import { Input } from "..";
import styles from "./formGroup.module.css";

interface IFormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  small?: boolean;
}

export function FormGroup({ label, small, ...props }: IFormGroupProps) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <Input {...props} small={small} />
    </div>
  );
}
