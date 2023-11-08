import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLoading } from "../../../../components";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../services/firebase";
import { PlayEasy } from "./components/Easy";
import { PlayHard } from "./components/Hard";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<"easy" | "hard" | null>(null);

  async function loadGame() {
    setLoading(true);

    try {
      const gameRef = doc(db, "games", `${id}`);
      const gameSnapshot = await getDoc(gameRef);

      if (gameSnapshot.exists()) {
        const gameData = gameSnapshot.data();
        setGameMode(gameData.mode);
      } else {
        console.error("Jogo não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  if (loading) return <PageLoading />;

  if (gameMode === "easy") return <PlayEasy />;
  if (gameMode === "hard") return <PlayHard />;
}
