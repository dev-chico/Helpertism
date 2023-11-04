import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { Button, PageLoading } from "../../../../components";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../services/firebase";
import { EndGame } from "./components/endGame";
import styles from "./play.module.css";

export interface IQuiz {
  id: string;
  question: string;
  image: string;
  answerOptions: string[];
  correctAnswer: string;
}

export function Play() {
  const { id } = useParams();
  const db = getFirestore(firebaseApp);
  const gamesCollection = collection(db, "games");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  ("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<IQuiz[]>([
    {
      id: "",
      question: "",
      image: "",
      answerOptions: [],
      correctAnswer: "",
    },
  ]);

  async function loadGame() {
    setLoading(true);

    try {
      const roundsCollectionRef = collection(
        gamesCollection,
        `${id}`,
        "rounds"
      );
      const querySnapshot = await getDocs(roundsCollectionRef);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rounds: any[] = [];
      querySnapshot.forEach((doc) => {
        rounds.push(doc.data());
      });

      setQuiz(rounds);
    } catch (error) {
      console.error("Erro ao buscar post:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    if (quiz.length) {
      const optionsFormated = quiz[currentQuestion].answerOptions.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.text
      );
      setQuestion(quiz[currentQuestion].question);
      setAnswer(quiz[currentQuestion].correctAnswer);
      setOptions(optionsFormated);
      setImage(quiz[currentQuestion].image);
    }
  }, [quiz]);

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
      const optionsFormated = quiz[currentQuestion].answerOptions.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.text
      );
      setDisabled(true);
      setQuestion(quiz[currentQuestion].question);
      setOptions(optionsFormated);
      setAnswer(quiz[currentQuestion].correctAnswer);
      setImage(quiz[currentQuestion].image);
    }
  }, [currentQuestion]);

  function checkAnswer(answer: string) {
    setMyAnswer(answer);
    setDisabled(false);
  }

  function finishHandler() {
    if (currentQuestion === quiz.length - 1) {
      setIsEnd(true);
    }

    if (myAnswer === answer) {
      setScore((state) => state + 1);
    }
  }

  if (isEnd) {
    return <EndGame quiz={quiz} score={score} />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <div className={styles.container}>
        <Link to={AuthenticatedPaths.home} className={styles.back}>
          <Button bgColor="blue" small>
            Sair
          </Button>
        </Link>

        <main>
          <header>
            <h2 className={styles.title}>{question}</h2>
            <div className={styles.imgContainer}>
              <img className={styles.image} src={image} />
            </div>
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

            {currentQuestion < quiz.length - 1 && (
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

            {currentQuestion === quiz.length - 1 && (
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
