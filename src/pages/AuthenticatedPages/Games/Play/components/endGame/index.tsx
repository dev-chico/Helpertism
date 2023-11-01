import { Link } from 'react-router-dom';
import { AuthenticatedPaths } from '../../../../../../constants/paths';
import { Button } from '../../../../../../components';
import { IQuiz } from '../..';
import styles from './endGame.module.css'

interface IEndGame {
  score: number;
  quiz: IQuiz[]
}

export function EndGame({ score, quiz }: IEndGame) {
  return (
    <main className={styles.endContainer}>
      <section className={styles.points}>
        <h1 className={styles.title}>Fim de jogo! 😁💙</h1>
        <p className={styles.msgFinishGame}>
          Sua pontuação final foi de: {score} {score === 1 ? "ponto" : "pontos"}
        </p>
      </section>

      <section className={styles.correctAnswersContainer}>
        <p className={styles.subtitle}>
          As respostas corretas para as perguntas eram:
        </p>

        {quiz.map((item, index) => (
          <div className={styles.correctAnswer}>
            <img src={item.image} alt={item.correctAnswer} />
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
