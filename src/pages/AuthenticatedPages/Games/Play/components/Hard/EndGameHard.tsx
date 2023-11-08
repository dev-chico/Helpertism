import { Link } from "react-router-dom";
import { Button } from "../../../../../../components";
import { AuthenticatedPaths } from "../../../../../../constants/paths";
import { IQuiz } from ".";
import styles from "./endGame.module.css";

interface IEndGame {
  score: number;
  quiz: IQuiz[];
}

export function EndGameHard({ score, quiz }: IEndGame) {
  return (
    <main className={styles.endContainer}>
      <section className={styles.points}>
        <h1 className={styles.title}>Fim de jogo! 😁💙</h1>
        <p className={styles.msgFinishGame}>
          Sua pontuação final foi de:{" "}
          <b>
            {score} {score === 1 ? "ponto" : "pontos"}
          </b>
        </p>
      </section>

      <section className={styles.correctAnswersContainer}>
        <p className={styles.subtitle}>
          As respostas corretas para as perguntas eram:
        </p>

        {quiz.map((item, index) => (
          <div className={styles.correctAnswer}>
            {item.image.length > 0 && (
              <img src={item.image} alt={item.correctAnswer} />
            )}
            <p key={index}>{item.correctAnswer}</p>
          </div>
        ))}
      </section>

      <Link to={AuthenticatedPaths.home}>
        <Button bgColor="blue" rounded={false}>
          Continuar
        </Button>
      </Link>
    </main>
  );
}
