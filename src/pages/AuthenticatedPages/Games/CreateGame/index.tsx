import { FormGroup } from "../../../../components/FormGroup";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FooterCreate } from "../../../../components/FooterCreate";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { firebaseApp } from "../../../../services/firebase";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createGame.module.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

const defaultQuestion = {
  question: "",
  image: "",
  correctAnswer: "",
};

export function CreateGame() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);
  const gamesCollection = collection(db, "games");
  const [rounds, setRounds] = useState([
    {
      uid: uuidv4(),
      answerOptions: [
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
      ],
      ...defaultQuestion,
    },
    {
      uid: uuidv4(),
      answerOptions: [
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
      ],
      ...defaultQuestion,
    },
    {
      uid: uuidv4(),
      answerOptions: [
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
        { uid: uuidv4(), text: "" },
      ],
      ...defaultQuestion,
    },
  ]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function createNewQuestion() {
    setIsLoading(true);
    const gameUID = uuidv4();
    const newGame = {
      uid: gameUID,
      title: title,
      description: description,
      img: "",
      date: `${new Date()}`,
      userId: user?.uid,
    };

    if (image) {
      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${gameUID}.jpg`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
        newGame.img = imageURL;
      } catch (error) {
        console.error("Erro ao fazer upload da imagem: ", error);
        return;
      }
    }

    const gameDocRef = doc(gamesCollection, gameUID);
    await setDoc(gameDocRef, newGame);

    const roundPromises = rounds.map(async (round) => {
      const newRound = {
        question: round.question,
        image: round.image,
        correctAnswer: round.correctAnswer,
        answerOptions: round.answerOptions,
        gameId: gameUID,
      };

      const roundDocRef = await addDoc(
        collection(gameDocRef, "rounds"),
        newRound
      );
      return roundDocRef;
    });

    Promise.all(roundPromises)
      .then(() => {
        console.log("Todas as rodadas foram criadas com sucesso.");

        setTitle("");
        setRounds([
          {
            uid: uuidv4(),
            answerOptions: [
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
            ],
            ...defaultQuestion,
          },
          {
            uid: uuidv4(),
            answerOptions: [
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
            ],
            ...defaultQuestion,
          },
          {
            uid: uuidv4(),
            answerOptions: [
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
              { uid: uuidv4(), text: "" },
            ],
            ...defaultQuestion,
          },
        ]);
        setImage(null);
        setIsLoading(false);
        navigate("/jogos");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Erro ao criar as rodadas:", error);
      });
  }

  function removeQuestion(id: string) {
    if (rounds.length > 3) {
      setRounds((state) => state.filter((q) => q.uid !== id));
    }
  }

  function handleRoundChange(index: number, field: string, value: string) {
    const updatedRounds = [...rounds];
    if (field === "question") {
      updatedRounds[index].question = value;
    } else {
      updatedRounds[index].image = value;
    }
    setRounds(updatedRounds);
  }

  async function handleRoundImageChange(index: number, value: File | null) {
    const imgUid = uuidv4();
    const updatedRounds = [...rounds];

    if (value) {
      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${imgUid}.jpg`);
        await uploadBytes(storageRef, value);
        const imageURL = await getDownloadURL(storageRef);
        updatedRounds[index].image = imageURL;

        setRounds(updatedRounds);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem: ", error);
        return;
      }
    }
  }

  function handleOptionChange(
    roundIndex: number,
    optionIndex: number,
    value: string
  ) {
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex].answerOptions[optionIndex].text = value;
    setRounds(updatedRounds);
  }

  function handleCorrectOptionChange(roundIndex: number, optionIndex: number) {
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex].correctAnswer =
      updatedRounds[roundIndex].answerOptions[optionIndex].text;
    setRounds(updatedRounds);
  }

  function handleAddNewRound() {
    setRounds((state) => [
      ...state,
      {
        uid: uuidv4(),
        answerOptions: [
          { uid: uuidv4(), text: "" },
          { uid: uuidv4(), text: "" },
          { uid: uuidv4(), text: "" },
        ],
        ...defaultQuestion,
      },
    ]);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Novo jogo</h1>
      </header>

      <section className={styles.uploadImageContainer}>
        <img
          src={
            image
              ? typeof image === "string"
                ? image
                : URL.createObjectURL(image)
              : defaultImage
          }
          alt="Imagem de um triângulo, um quadrado e um círculo cinzas"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files && e.target.files[0];
            if (selectedFile) {
              setImage(selectedFile);
            }
          }}
        />
      </section>

      <form>
        <FormGroup
          label="Digite o título do jogo"
          placeholder="Título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormGroup
          label="Digite a descrição do jogo"
          placeholder="Descrição..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>

      <hr className={styles.divider} />

      <main>
        <h1>Rodadas</h1>

        <section className={styles.rounds}>
          {rounds.map((round, roundIndex) => (
            <div className={styles.round} key={round.uid}>
              <header>
                <h2>Rodada {roundIndex + 1}</h2>
                {rounds.length > 3 && (
                  <button onClick={() => removeQuestion(round.uid)}>
                    <FaTrashAlt color="#F33" size={20} />
                  </button>
                )}
              </header>
              <FormGroup
                label="Pergunta"
                placeholder="Qual é o...."
                value={round.question}
                onChange={(e) =>
                  handleRoundChange(roundIndex, "question", e.target.value)
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleRoundImageChange(
                    roundIndex,
                    e.target.files && e.target.files[0]
                  )
                }
              />

              <div className={styles.options}>
                {round.answerOptions.map((opt, optIndex) => (
                  <div key={`${opt}-${optIndex}`} className={styles.opt}>
                    <FormGroup
                      label={`Opção ${optIndex + 1}`}
                      value={opt.text}
                      placeholder="Qual é o...."
                      small
                      onChange={(e) =>
                        handleOptionChange(roundIndex, optIndex, e.target.value)
                      }
                    />
                    <div className={styles.optRadio}>
                      <input
                        type="radio"
                        name={`opts-${round.uid}`}
                        id={`${opt.uid}-${optIndex}`}
                        checked={round.correctAnswer === opt.text}
                        onChange={() =>
                          handleCorrectOptionChange(roundIndex, optIndex)
                        }
                      />
                      <label htmlFor={`${opt.uid}-${optIndex}`}>Correta</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <button
          disabled={rounds.length === 10}
          onClick={handleAddNewRound}
          className={styles.addQuestion}
        >
          Adicionar uma nova pergunta
        </button>
      </main>

      <FooterCreate
        disabled={isLoading}
        pathToCancel={AuthenticatedPaths.home}
        onConfirm={createNewQuestion}
      />
    </div>
  );
}
