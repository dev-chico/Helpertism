import { Button } from "../../../components";
import { Card } from "../../../components/Card";
import { DailyActivities } from "./components/DailyActivities";
import styles from "./home.module.css";

export function Home() {
  return (
    <div className={styles.container}>
      <h1>home</h1>
      <Card
        title="Jogo"
        date="14/09/2023"
        description="lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor"
      >
        <Button small>Jogar</Button>
      </Card>

      <DailyActivities />
    </div>
  );
}
