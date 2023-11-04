import { useEffect, useState, FormEvent } from "react";
import { Button, Input, PasswordInput, Loader } from "../../../components";
import { Link } from "react-router-dom";
import { UnauthenticatedPaths } from "../../../constants/paths";
import { useAuth } from "../../../contexts/AuthContext";
import logo from "../../../assets/imgs/logo.png";
import styles from "./register.module.css";

export function Register() {
  const { handleSignUp, loading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [differentPasswords, setDifferentPasswords] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [shortPassword, setShortPassword] = useState<boolean>(false);

  function handleRegister(event: FormEvent) {
    event.preventDefault();
    handleSignUp(email, password, name, Number(age));
  }

  useEffect(() => {
    setDisabled(true);

    if (password.length && confirmPassword.length) {
      if (confirmPassword !== password) {
        setDifferentPasswords(true);
      } else {
        setDifferentPasswords(false);
      }
    }

    if (confirmPassword === password && password.length >= 6) {
      setDisabled(false);
    }

    if (password.length < 6 && password.length > 0) {
      setShortPassword(true);
    } else {
      setShortPassword(false);
    }
  }, [confirmPassword, password]);

  return (
    <div className={styles.container}>
      <main>
        <img src={logo} alt="Logo escrito Helpertism" />
        <form onSubmit={handleRegister}>
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
            <div className={styles.confirmPassword}>
              <PasswordInput
                value={password}
                onchange={setPassword}
                placeholder="Senha"
              />

              {shortPassword && (
                <span>Senha deve ter pelo menos 6 caracteres!</span>
              )}
            </div>
            <div className={styles.confirmPassword}>
              <PasswordInput
                value={confirmPassword}
                onchange={setConfirmPassword}
                placeholder="Confirme sua senha"
              />
              {differentPasswords && <span>Senhas não conferem!</span>}
            </div>
          </div>

          {loading ? (
            <div className={styles.registerLoader}>
              <Loader small />
            </div>
          ) : (
            <Button type="submit" disabled={disabled}>
              Cadastrar
            </Button>
          )}

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
