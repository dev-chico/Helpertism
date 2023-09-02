import { useState } from "react";
import { Button, Input } from "../../../components";
import { Link } from "react-router-dom";
import logo from "../../../assets/imgs/logo.png";
import styles from "./login.module.css";
import { UnauthenticatedPaths } from "../../../constants/paths";

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
              Não possui uma conta?{" "}
              <Link to={UnauthenticatedPaths.register}>Crie uma!</Link>
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
}
