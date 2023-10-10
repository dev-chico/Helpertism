import { Button } from "../../../../components";
import { FormGroup } from "../../../../components/FormGroup";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthenticatedPaths } from "../../../../constants/paths";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createGame.module.css";

const generateId = () => Math.floor(Math.random() * 500);

const defaultQuestion = {
  question: "",
  image: "",
  correctAnswer: "",
};

export function CreateGame() {
  const [rounds, setRounds] = useState([
    {
      id: generateId(),
      answerOptions: [
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
      ],
      ...defaultQuestion,
    },
    {
      id: generateId(),
      answerOptions: [
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
      ],
      ...defaultQuestion,
    },
    {
      id: generateId(),
      answerOptions: [
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
        { id: generateId(), text: "" },
      ],
      ...defaultQuestion,
    },
  ]);

  useEffect(() => {
    console.log("VALUES: ", rounds);
  }, []);

  function createNewQuestion() {
    setRounds((state) => [
      ...state,
      {
        id: generateId(),
        answerOptions: [
          { id: generateId(), text: "" },
          { id: generateId(), text: "" },
          { id: generateId(), text: "" },
        ],
        ...defaultQuestion,
      },
    ]);
  }

  function removeQuestion(id: number) {
    if (rounds.length > 3) {
      setRounds((state) => state.filter((q) => q.id !== id));
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Novo jogo</h1>
      </header>

      <section className={styles.uploadImageContainer}>
        <img
          src={defaultImage}
          alt="Imagem de um triângulo, um quadrado e um círculo cinzas"
        />
        <Button small bgColor="gray">
          Escolher arquivo
        </Button>
      </section>

      <form>
        <FormGroup label="Digite o título do jogo" placeholder="Título..." />
      </form>

      <hr className={styles.divider} />

      <main>
        <h1>Rodadas</h1>

        <section className={styles.rounds}>
          {rounds.map((round, index) => (
            <div className={styles.round} key={round.id}>
              <header>
                <h2>Rodada {index + 1}</h2>
                {rounds.length > 3 && (
                  <button onClick={() => removeQuestion(round.id)}>
                    <FaTrashAlt color="#F33" size={20} />
                  </button>
                )}
              </header>
              <FormGroup label="Pergunta" placeholder="Qual é o...." />
              <input type="file" />

              <div className={styles.options}>
                {round.answerOptions.map((opt, index) => (
                  <div key={`${opt}-${index}`} className={styles.opt}>
                    <FormGroup
                      label={`Opção ${index + 1}`}
                      value={opt.text}
                      placeholder="Qual é o...."
                      small
                    />
                    <div className={styles.optRadio}>
                      <input
                        type="radio"
                        name={`opts-${round.id}`}
                        id={`${opt.id}-${index}`}
                      />
                      <label htmlFor={`${opt.id}-${index}`}>Correta</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <button
          disabled={rounds.length === 10}
          onClick={createNewQuestion}
          className={styles.addQuestion}
        >
          Adicionar uma nova pergunta
        </button>
      </main>

      <footer className={styles.footer}>
        <Link to={AuthenticatedPaths.home}>
          <Button bgColor="red" small>
            Cancelar
          </Button>
        </Link>
        <Button bgColor="blue" disabled small>
          Salvar
        </Button>
      </footer>
    </div>
  );
}
