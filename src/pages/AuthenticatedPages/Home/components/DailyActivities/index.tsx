import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../components";
import { AuthenticatedPaths } from "../../../../../constants/paths";
import styles from "./dailyActivities.module.css";

interface IActivities {
  id: string;
  name: string;
  checked: boolean;
}

export function DailyActivities() {
  const [activitiesList, setActivitiesList] = useState<IActivities[]>([]);

  useEffect(() => {
    setActivitiesList([
      {
        id: "A5NG895G",
        checked: true,
        name: "Ir para a academia",
      },
      {
        id: "DCN6MHP",
        checked: false,
        name: "Trabalhar",
      },
      {
        id: "DCN6MH2dP",
        checked: false,
        name: "Estudar React",
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas atividades diárias</h2>

      <main>
        <ul>
          {activitiesList &&
            activitiesList.map((actv: IActivities) => (
              <li key={actv.id}>
                <span>{actv.name}</span>
                <input type="checkbox" checked={actv.checked} />
              </li>
            ))}
        </ul>

        {!activitiesList.length && (
          <h3 className={styles.noData}>Sem tarefas!</h3>
        )}
      </main>

      <footer>
        <Link to={AuthenticatedPaths.activities}>
          <Button>Ver atividades da semana</Button>
        </Link>
      </footer>
    </div>
  );
}
