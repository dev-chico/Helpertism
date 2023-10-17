import { useState, useEffect } from "react";
import { Button } from "../../../components";
import { Card, ICard } from "../../../components/Card";
import { DailyActivities } from "./components/DailyActivities";
import { HomeSection } from "./components/HomeSection";
import { gamesMock, lastPlayedGamesMock } from "./mock";
import { Link } from "react-router-dom";
import { NoDataView } from "../../../components/NoDataView/NoDataView";
import { AuthenticatedPaths } from "../../../constants/paths";
import styles from "./home.module.css";

export function Home() {
  const [lastPlayedGames, setLastPlayedGames] = useState<ICard[]>([]);
  const [games, setGames] = useState<ICard[]>([]);

  useEffect(() => {
    setLastPlayedGames(lastPlayedGamesMock);
    setGames(gamesMock);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {(lastPlayedGames.length > 0 || games.length > 0) && (
          <Link to={AuthenticatedPaths.games.create}>
            <Button small bgColor="orange">
              Criar um novo jogo
            </Button>
          </Link>
        )}

        <section className={styles.gamesList}>
          {lastPlayedGames.length > 0 && (
            <HomeSection title="Últimos jogos">
              {lastPlayedGames.map((game: ICard) => (
                <Card
                  key={game.id}
                  id={game.id}
                  img={game.img}
                  title={game.title}
                  date={game.date}
                  description={game.description}
                >
                  <Link to={`${AuthenticatedPaths.games.play}/${game.id}`}>
                    <Button small>Jogar</Button>
                  </Link>
                </Card>
              ))}
            </HomeSection>
          )}

          {games.length > 0 && (
            <HomeSection title="Todos os jogos">
              {games.map((game: ICard) => (
                <Card
                  key={game.id}
                  id={game.id}
                  img={game.img}
                  title={game.title}
                  date={game.date}
                  description={game.description}
                >
                  <Link to={`${AuthenticatedPaths.games.play}/${game.id}`}>
                    <Button small>Jogar</Button>
                  </Link>
                </Card>
              ))}
            </HomeSection>
          )}
        </section>

        {lastPlayedGames.length === 0 && games.length === 0 ? (
          <NoDataView text="Crie seu primeiro jogo" />
        ) : null}
      </main>

      <DailyActivities />
    </div>
  );
}
