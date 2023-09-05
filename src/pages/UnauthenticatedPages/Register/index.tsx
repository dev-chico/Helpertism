import { useEffect, useState } from "react";
import { Button, Input } from "../../../components";
import { Link } from "react-router-dom";
import logo from "../../../assets/imgs/logo.png";
import styles from "./register.module.css";
import { UnauthenticatedPaths } from "../../../constants/paths";

export function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

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
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Idade"
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

          <Button onClick={handleLogin}>Cadastrar</Button>

          <footer>
            <p>
              Já possui uma conta?{" "}
              <Link to={UnauthenticatedPaths.login}>Entrar!</Link>
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
}
