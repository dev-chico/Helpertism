import { useState } from "react";
import { Input } from "..";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./passwordInput.module.css";

interface IPasswordInputProps {
  value: string;
  onchange: (val: string) => void;
  placeholder: string;
}

export function PasswordInput({
  onchange,
  value,
  placeholder,
}: IPasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleChange(val: string) {
    onchange(val);
  }

  function toggleShowPassword() {
    setShowPassword((state) => !state);
  }

  return (
    <div className={styles.container}>
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
      />
      <div className={styles.icons}>
        {showPassword ? (
          <FaEye onClick={toggleShowPassword} size={20} color="var(--blue)" />
        ) : (
          <FaEyeSlash
            onClick={toggleShowPassword}
            size={20}
            color="var(--blue)"
          />
        )}
      </div>
    </div>
  );
}
