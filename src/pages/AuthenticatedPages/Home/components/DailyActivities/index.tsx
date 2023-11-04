import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, PageLoading } from "../../../../../components";
import { AuthenticatedPaths } from "../../../../../constants/paths";
import { firebaseApp } from "../../../../../services/firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../../../../../contexts/AuthContext";
import styles from "./dailyActivities.module.css";

interface ITask {
  uid?: string;
  description: string;
  date: string;
  checked: boolean;
  userId: string | undefined;
}

export function DailyActivities() {
  const db = getFirestore(firebaseApp);
  const { user } = useAuth();
  const [activitiesList, setActivitiesList] = useState<ITask[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  useEffect(() => {
    setLoadingPage(true);

    async function loadTasks() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (user) {
        try {
          const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          console.log("today: ", today.getDate());

          const tasksData: ITask[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().date.trim() !== String(today).trim()) return;

            const newTask: ITask = {
              checked: doc.data().checked,
              date: doc.data().date,
              description: doc.data().description,
              uid: doc.data().uid,
              userId: doc.data().userId,
            };

            tasksData.push(newTask);
          });

          setActivitiesList(tasksData);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        } finally {
          setLoadingPage(false);
        }
      }
    }

    loadTasks();
  }, []);

  console.log(activitiesList);

  async function handleChangeTasksList(id: number | string) {
    console.log(id);

    const taskToUpdate = activitiesList.find((task) => task.uid === id);

    if (!taskToUpdate) {
      return;
    }

    const updatedTask = { ...taskToUpdate, checked: !taskToUpdate.checked };

    try {
      await updateDoc(doc(db, "tasks", taskToUpdate.uid!), updatedTask);

      const updatedTasks = activitiesList.map((task) =>
        task.uid === id ? updatedTask : task
      );

      setActivitiesList(updatedTasks);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  if (loadingPage) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas atividades diárias</h2>

      <main>
        <ul>
          {activitiesList &&
            activitiesList.map((actv: ITask) => (
              <li key={actv.uid}>
                <span>{actv.description}</span>
                <input
                  type="checkbox"
                  checked={actv.checked}
                  onChange={() => handleChangeTasksList(actv.uid!)}
                />
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
