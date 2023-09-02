import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import logo from "../../assets/imgs/logo.png";
import styles from "./register.module.css";

export function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  function handleLogin() {
    console.log("logou");
  }

  useEffect(() => {
    if (confirmPassword !== password) {
      console.log("Senhas diferentes");
    }
  }, [confirmPassword]);

  return (
    <div className={styles.container}>
      <main>
        <img src={logo} alt="Logo escrito Helpertism" />
        <form>
          <div className={styles.inputs}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
            />
          </div>

          <Button onClick={handleLogin}>Entrar</Button>

          <footer>
            <p>
              Não possui uma conta? <a href="#">Crie uma!</a>
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
}
