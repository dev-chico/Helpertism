import { Button } from "../../../components";
import { Card } from "../../../components/Card";

export function Home() {
  return (
    <div>
      <h1>home</h1>
      <Card
        title="Jogo"
        date="14/09/2023"
        description="lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor"
      >
        <Button small>Jogar</Button>
      </Card>
    </div>
  );
}
