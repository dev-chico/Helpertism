import { useState, useEffect } from "react";
import { Button } from "../../../components";
import { Card, ICard } from "../../../components/Card";
import { DailyActivities } from "./components/DailyActivities";
import { HomeSection } from "./components/HomeSection";
import { Link, useNavigate } from "react-router-dom";
import { NoDataView } from "../../../components/NoDataView/NoDataView";
import { AuthenticatedPaths } from "../../../constants/paths";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../../../services/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { PageLoading } from "../../../components/PageLoading";
import { DeleteGameModal } from "./components/DeleteGameModal";
import styles from "./home.module.css";

export function Home() {
  const { user } = useAuth();
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const viewSize = window.innerWidth;
  const [games, setGames] = useState<ICard[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [uidToDelete, setUidToDelete] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  async function loadGames() {
    setLoadingPage(true);
    if (user) {
      try {
        const q = query(
          collection(db, "games"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const gamesData: ICard[] = [];
        querySnapshot.forEach((doc) => {
          const newGame: ICard = {
            uid: doc.data().uid,
            title: doc.data().title,
            description: doc.data().description,
            img: doc.data().img,
            date: doc.data().date,
            userId: doc.data().userId,
          };

          gamesData.push(newGame);
        });

        console.log(gamesData);

        setGames(gamesData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoadingPage(false);
      }
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  function handleOpenModalDelete(id: string) {
    setShowModalDelete(true);
    setUidToDelete(id);
  }

  function handleCloseModalDelete() {
    setShowModalDelete(false);
    loadGames();
  }

  function navigateToEdit(id: string) {
    navigate(`/jogos/editar/${id}`);
  }

  if (loadingPage) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {games.length > 0 && (
          <Link to={AuthenticatedPaths.games.create}>
            <Button small bgColor="orange">
              Criar um novo jogo
            </Button>
          </Link>
        )}

        <section className={styles.gamesList}>
          {games.length > 0 && (
            <HomeSection title="Todos os jogos">
              {games.map((game: ICard) => (
                <Card
                  key={game.uid}
                  uid={game.uid}
                  img={game.img}
                  title={game.title}
                  date={game.date}
                  description={game.description}
                >
                  <Link to={`${AuthenticatedPaths.games.play}/${game.uid}`}>
                    <Button small>Jogar</Button>
                  </Link>

                  {game.userId === user?.uid && (
                    <>
                      <button
                        className={styles.btnAct}
                        onClick={() => handleOpenModalDelete(game.uid)}
                      >
                        <FaTrash color="var(--red)" size={24} />
                      </button>
                      <button
                        className={styles.btnAct}
                        onClick={() => navigateToEdit(game.uid)}
                      >
                        <FaEdit color="var(--yellow)" size={24} />
                      </button>
                    </>
                  )}
                </Card>
              ))}
            </HomeSection>
          )}
        </section>

        {games.length === 0 ? (
          <NoDataView
            text="Crie seu primeiro jogo"
            path={AuthenticatedPaths.games.create}
          />
        ) : null}
      </main>

      {viewSize > 768 && <DailyActivities />}

      <DeleteGameModal
        isOpen={showModalDelete}
        handleToggle={handleCloseModalDelete}
        uid={uidToDelete}
      />
    </div>
  );
}
