import { useState, useEffect } from "react";
import { Button } from "../../../components";
import { Card, ICardGame } from "../../../components/Card";
import { DailyActivities } from "./components/DailyActivities";
import { HomeSection } from "./components/HomeSection";
import { gamesMock, lastPlayedGamesMock } from "./mock";
import styles from "./home.module.css";
import { NoGamesView } from "./components/NoGamesView/NoGamesView";
import { Link } from "react-router-dom";

export function Home() {
  const [lastPlayedGames, setLastPlayedGames] = useState<ICardGame[]>([]);
  const [games, setGames] = useState<ICardGame[]>([]);

  useEffect(() => {
    setLastPlayedGames(lastPlayedGamesMock);
    setGames(gamesMock);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {(lastPlayedGames.length > 0 || games.length > 0) && (
          <Link to="/">
            <Button small bgColor="orange">
              Criar um novo jogo
            </Button>
          </Link>
        )}

        <section className={styles.gamesList}>
          {lastPlayedGames.length > 0 && (
            <HomeSection title="Últimos jogos">
              {lastPlayedGames.map((game: ICardGame) => (
                <Card
                  key={game.id}
                  id={game.id}
                  img={game.img}
                  title={game.title}
                  date={game.date}
                  description={game.description}
                >
                  <Button small>Jogar</Button>
                </Card>
              ))}
            </HomeSection>
          )}

          {games.length > 0 && (
            <HomeSection title="Todos os jogos">
              {games.map((game: ICardGame) => (
                <Card
                  key={game.id}
                  id={game.id}
                  img={game.img}
                  title={game.title}
                  date={game.date}
                  description={game.description}
                >
                  <Button small>Jogar</Button>
                </Card>
              ))}
            </HomeSection>
          )}
        </section>

        {lastPlayedGames.length === 0 && games.length === 0 ? (
          <NoGamesView />
        ) : null}
      </main>

      <DailyActivities />
    </div>
  );
}
