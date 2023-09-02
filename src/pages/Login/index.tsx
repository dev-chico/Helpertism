import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import logo from "../../assets/imgs/logo.png";
import styles from "./login.module.css";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin() {
    console.log("logou");
  }

  return (
    <div className={styles.container}>
      <main>
        <img src={logo} alt="Logo escrito Helpertism" />
        <form>
          <div className={styles.inputs}>
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
