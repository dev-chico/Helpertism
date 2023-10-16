import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { AnimalsQuiz } from "./quizzData";
import { Button } from "../../../../components";
import styles from "./play.module.css";

export function Play() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [question, setQuestion] = useState<string>("");''
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  function loadAnimalsQuiz() {
    setQuestion(AnimalsQuiz[currentQuestion].question);
    setAnswer(AnimalsQuiz[currentQuestion].answer);
    setOptions(AnimalsQuiz[currentQuestion].options);
    setImage(AnimalsQuiz[currentQuestion].image);
  }

  useEffect(() => {
    loadAnimalsQuiz();
  }, []);

  function nextQuestionHandler() {
    if (myAnswer === answer) {
      setScore((state) => state + 1);
    }

    setCurrentQuestion((state) => state + 1);
    setMyAnswer("");
  }

  const prevCurrentQuestion = usePrevious(currentQuestion);

  function usePrevious(value: number): number {
    const ref = useRef<number>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current || 0;
  }

  useEffect(() => {
    if (currentQuestion !== prevCurrentQuestion) {
      setDisabled(true);
      setQuestion(AnimalsQuiz[currentQuestion].question);
      setOptions(AnimalsQuiz[currentQuestion].options);
      setAnswer(AnimalsQuiz[currentQuestion].answer);
      setImage(AnimalsQuiz[currentQuestion].image);
    }
  }, [currentQuestion]);

  function checkAnswer(answer: string) {
    setMyAnswer(answer);
    setDisabled(false);
  }

  function finishHandler() {
    if (currentQuestion === AnimalsQuiz.length - 1) {
      setIsEnd(true);
    }

    if (myAnswer === answer) {
      setScore((state) => state + 1);
    }
  }

  if (isEnd) {
    return (
      <main className={styles.endContainer}>
        <section className={styles.points}>
          <h1 className={styles.title}>Fim de jogo! 😁💙</h1>
          <p className={styles.msgFinishGame}>
            Sua pontuação final foi de: {score}{" "}
            {score === 1 ? "ponto" : "pontos"}
          </p>
        </section>

        <section className={styles.correctAnswersContainer}>
          <p className={styles.subtitle}>
            As respostas corretas para as perguntas eram:
          </p>

          {AnimalsQuiz.map((item, index) => (
            <div className={styles.correctAnswer}>
              <img src={item.image} alt={item.answer} />
              <p key={index}>{item.answer}</p>
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

  return (
    <>
      <div className={styles.container}>
        <Link to={AuthenticatedPaths.home} className={styles.back}>
          <Button bgColor="blue">Sair</Button>
        </Link>

        <main>
          <header>
            <h2 className={styles.title}>{question}</h2>
            <img className={styles.image} src={image} />
          </header>

          <section className={styles.buttonsControl}>
            <div className={styles.questionsContainer}>
              {options.map((option) => (
                <Button
                  key={option}
                  bgColor={myAnswer === option ? "gray" : "blue"}
                  onClick={() => checkAnswer(option)}
                  rounded={false}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className={styles.line}></div>

            {currentQuestion < AnimalsQuiz.length - 1 && (
              <Button
                disabled={disabled}
                onClick={nextQuestionHandler}
                className={`${styles.btn} ${styles.btnNext}`}
                bgColor="orange"
                small
              >
                Próxima
              </Button>
            )}

            {currentQuestion === AnimalsQuiz.length - 1 && (
              <Button
                disabled={myAnswer === ""}
                onClick={finishHandler}
                bgColor="orange"
                small
              >
                Finalizar
              </Button>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
