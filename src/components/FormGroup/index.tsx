import { InputHTMLAttributes } from "react";
import { Input } from "..";
import styles from "./formGroup.module.css";

interface IFormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormGroup({ label, ...props }: IFormGroupProps) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <Input {...props} />
    </div>
  );
}
