import { FormEvent, useEffect, useState } from "react";
import { Button, Input, PasswordInput, Loader } from "../../../components";
import { Link } from "react-router-dom";
import { UnauthenticatedPaths } from "../../../constants/paths";
import { useAuth } from "../../../contexts/AuthContext";
import logo from "../../../assets/imgs/logo.png";
import styles from "./login.module.css";

export function Login() {
  const { handleLogin, loading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(true);
    email.length && password.length ? setDisabled(false) : setDisabled(true);
  }, [email, password]);

  function login(e: FormEvent) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className={styles.container}>
      <main>
        <img src={logo} alt="Logo escrito Helpertism" />
        <form onSubmit={login}>
          <div className={styles.inputs}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <PasswordInput
              value={password}
              onchange={setPassword}
              placeholder="Senha"
            />
          </div>

          {loading ? (
            <div className={styles.loginLoader}>
              <Loader small />
            </div>
          ) : (
            <Button disabled={disabled}>Entrar</Button>
          )}

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
