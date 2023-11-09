import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FooterCreate, FormGroup, PageLoading } from "../../../../components";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { firebaseApp } from "../../../../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createGame.module.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { toast } from "../../../../components/Toast/toast";

const defaultQuestion = {
  question: "",
  image: "",
  correctAnswer: "",
};

export function CreateGame() {
  const { id } = useParams();
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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imageToEdit, setImageToEdit] = useState("");
  const [gameMode, setGameMode] = useState<"easy" | "hard">("easy");

  async function loadGame() {
    setIsLoading(true);

    try {
      const gameRef = doc(db, "games", `${id}`);
      const gameSnapshot = await getDoc(gameRef);

      if (gameSnapshot.exists()) {
        const gameData = gameSnapshot.data();

        setTitle(gameData.title);
        setImageToEdit(gameData.img);
        setDescription(gameData.description);
        setGameMode(gameData.mode);

        const roundsCollectionRef = collection(gameRef, "rounds");
        const roundsQuerySnapshot = await getDocs(roundsCollectionRef);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loadedRounds: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        roundsQuerySnapshot.forEach((roundDoc: any) => {
          const roundData = roundDoc.data();
          loadedRounds.push(roundData);
        });

        setRounds(loadedRounds);
      } else {
        console.error("Jogo não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      loadGame();
    }

    setIsLoading(false);
  }, []);

  async function handleCreateGame() {
    setIsLoading(true);

    const gameUID = uuidv4();
    const newGame = {
      uid: gameUID,
      title: title,
      description: description,
      mode: gameMode,
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
      const roundUID = uuidv4();

      const newRound = {
        uid: roundUID,
        question: round.question,
        image: round.image,
        correctAnswer: round.correctAnswer,
        answerOptions: round.answerOptions,
        gameId: gameUID,
      };

      const roundDocRef = doc(collection(gameDocRef, "rounds"), roundUID);
      await setDoc(roundDocRef, newRound);
    });

    Promise.all(roundPromises)
      .then(() => {
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

        setDescription("");
        setTitle("");
        setImage(null);
        setIsLoading(false);
        navigate("/jogos");
        toast({
          text: "Jogo criado com sucesso",
          type: "success",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          text: "Erro ao criar jogo",
          type: "danger",
        });
        console.error("Erro ao criar as rodadas:", error);
      });
  }

  async function handleEditGame() {
    setIsLoading(true);

    const gameRef = doc(db, "games", String(id));

    try {
      const updatedData = {
        title,
        description,
        mode: gameMode,
        img: "",
      };

      if (image !== null) {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${id}.jpg`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
        updatedData.img = imageURL;
      } else {
        updatedData.img = imageToEdit;
      }

      await updateDoc(gameRef, updatedData);

      // Exclua todas as rodadas existentes
      const roundsCollectionRef = collection(gameRef, "rounds");
      const existingRoundsQuerySnapshot = await getDocs(roundsCollectionRef);
      existingRoundsQuerySnapshot.forEach(async (roundDoc) => {
        await deleteDoc(roundDoc.ref);
      });

      const roundPromises = rounds.map(async (round) => {
        const newRoundUID = round.uid || uuidv4(); // Gere um novo uid se não houver um
        const newRound = {
          uid: newRoundUID,
          question: round.question,
          image: round.image,
          correctAnswer: round.correctAnswer,
          answerOptions: round.answerOptions,
          gameId: id,
        };

        const roundDocRef = doc(collection(gameRef, "rounds"), newRoundUID);
        await setDoc(roundDocRef, newRound, { merge: true });

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

          navigate("/jogos");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Erro ao editar as rodadas:", error);
        });

      toast({
        text: "Jogo editado com sucesso",
        type: "success",
      });
      navigate("/jogos");
    } catch (error) {
      console.error("Erro ao editar jogo:", error);
      toast({
        text: "Erro ao editar jogo",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
      setDescription("");
      setTitle("");
      setImage(null);
      setImageToEdit("");
      setIsLoading(false);
      setGameMode("easy");
    }
  }

  useEffect(() => {
    console.log(rounds);
  }, [rounds]);

  async function removeQuestion(id: string) {
    setRounds((state) => state.filter((q) => q.uid !== id));
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

  function validateGame() {
    if (!title.length || !description.length) {
      return true;
    }

    if (rounds.length < 3) {
      return true;
    }

    for (const round of rounds) {
      if (!round.question) {
        return true;
      }

      if (!round.correctAnswer) {
        return true;
      }

      for (const option of round.answerOptions) {
        if (!option.text) {
          return true;
        }
      }
    }

    return false;
  }

  if (isLoading) return <PageLoading />;

  return (
    <div className={styles.container}>
      <header>
        <h1>{isEdit ? "Editar jogo" : "Novo jogo"}</h1>
      </header>

      <section className={styles.uploadImageContainer}>
        <img
          src={
            image !== null
              ? URL.createObjectURL(image)
              : imageToEdit.length
              ? imageToEdit
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

        <section className={styles.gameMode}>
          <h3>Modo de jogo</h3>

          <main>
            <div className={styles.formGroup}>
              <input
                type="radio"
                name="radio-easy"
                id="radio-easy"
                checked={gameMode === "easy"}
                onChange={() => setGameMode("easy")}
              />
              <label htmlFor="radio-easy">Fácil</label>

              <div className={styles.tooltip}>
                <span>
                  O jogador sempre vai acertar! Só é permitido ir para a próxima
                  fase quando selecionar a resposta correta.
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <input
                type="radio"
                name="radio-hard"
                id="radio-hard"
                checked={gameMode === "hard"}
                onChange={() => setGameMode("hard")}
              />
              <label htmlFor="radio-hard">Difícil</label>

              <div className={styles.tooltip}>
                <span>
                  O jogador pode errar! Ao final do jogo, é apresentado quantas
                  perguntas o jogador acertou e a lista das perguntas com as
                  respostas corretas.
                </span>
              </div>
            </div>
          </main>
        </section>

        <p style={{ marginTop: 24 }}>
          <b>OBS:</b> O jogo deve ter no mínimo 3 rodadas e no máximo 10. Você
          só poderá salvar quando informar os campos obrigatórios (Título,
          pergunta e opções de resposta de cada rodada). Imagens não são
          obrigatórias.
        </p>
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
        disabled={validateGame()}
        pathToCancel={AuthenticatedPaths.home}
        onConfirm={isEdit ? handleEditGame : handleCreateGame}
      />
    </div>
  );
}
