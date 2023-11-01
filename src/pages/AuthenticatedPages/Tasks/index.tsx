import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { daysOfWeek } from "../../../constants/daysOfWeek";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../../../services/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { PageLoading } from "../../../components/PageLoading";
import { v4 as uuidv4 } from "uuid";
import styles from "./tasks.module.css";

interface ITask {
  uid?: string;
  description: string;
  date: string;
  checked: boolean;
  userId: string | undefined;
}

export const Tasks = () => {
  const db = getFirestore(firebaseApp);
  const tasksCollection = collection(db, "tasks");
  const { user } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [numberOfDays, setNumberOfDays] = useState(new Date().getMonth());
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [newTaskTexts, setNewTaskTexts] = useState(
    Array(numberOfDays).fill("")
  );
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  useEffect(() => {
    const lastDayOfMonth = new Date(
      new Date().getFullYear(),
      selectedMonth + 1,
      0
    );

    setNumberOfDays(lastDayOfMonth.getDate());
  }, [selectedMonth]);

  useEffect(() => {
    setLoadingPage(true);

    async function loadTasks() {
      if (user) {
        try {
          const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const tasksData: ITask[] = [];
          querySnapshot.forEach((doc) => {
            const newTask: ITask = {
              checked: doc.data().checked,
              date: doc.data().date,
              description: doc.data().description,
              uid: doc.data().uid,
              userId: doc.data().userId,
            };

            tasksData.push(newTask);
          });

          setTasksList(tasksData);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        } finally {
          setLoadingPage(false);
        }
      }
    }

    loadTasks();
  }, []);

  async function handleChangeTasksList(id: number | string) {
    const taskToUpdate = tasksList.find((task) => task.uid === id);

    if (!taskToUpdate) {
      return;
    }

    const updatedTask = { ...taskToUpdate, checked: !taskToUpdate.checked };

    try {
      await updateDoc(doc(db, "tasks", taskToUpdate.uid!), updatedTask);

      const updatedTasks = tasksList.map((task) =>
        task.uid === id ? updatedTask : task
      );

      setTasksList(updatedTasks);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  async function handleAddTask(date: Date, day: number) {
    const taskUID = uuidv4();
    const newTask: ITask = {
      uid: taskUID,
      description: newTaskTexts[day - 1],
      date: `${date}`,
      checked: false,
      userId: user?.uid,
    };

    try {
      await setDoc(doc(tasksCollection, taskUID), newTask);

      console.log("Tarefa cadastrada com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar tarefa:", error.message);
    }

    setNewTaskTexts((prevTaskTexts) => {
      setTasksList((state) => [...state, newTask]);

      const updatedTaskTexts = [...prevTaskTexts];
      updatedTaskTexts[day - 1] = "";
      return updatedTaskTexts;
    });
  }

  if (loadingPage) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className={styles.selectMonth}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={index}>
            {new Date(0, index).toLocaleDateString(undefined, {
              month: "long",
            })}
          </option>
        ))}
      </select>

      <main>
        <h2>Atividades do mês</h2>
        <section className={styles.calendar}>
          {Array.from({ length: numberOfDays }, (_, index) => {
            const day = index + 1;
            const date = new Date(new Date().getFullYear(), selectedMonth, day);
            const updatedTaskTexts = [...newTaskTexts];

            return (
              <div key={day} className={styles.dateContainer}>
                <main
                  className={`${styles.date} ${
                    new Date().getDate() === date.getDate() &&
                    new Date().getMonth() === date.getMonth() &&
                    styles.actualDate
                  }`}
                >
                  <span className={styles.dateLabel}>
                    {daysOfWeek[date.getDay()]}
                  </span>
                  <span className={styles.dateNumber}>{day}</span>

                  <ul className={styles.tasksList}>
                    {tasksList.map((task) => {
                      const taskDate = new Date(task.date);

                      if (
                        taskDate.getDate() === date.getDate() &&
                        taskDate.getMonth() === date.getMonth()
                      ) {
                        return (
                          <li key={task.uid}>
                            <input
                              type="checkbox"
                              onChange={() => handleChangeTasksList(task.uid!)}
                              checked={task.checked}
                              id={`check-task-${task.uid}`}
                            />
                            <label htmlFor={`check-task-${task.uid}`}>
                              {task.description}
                            </label>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </main>

                <footer>
                  <input
                    type="text"
                    placeholder="Tarefa..."
                    value={newTaskTexts[day - 1]}
                    onChange={(e) => {
                      updatedTaskTexts[day - 1] = e.target.value;
                      setNewTaskTexts(updatedTaskTexts);
                    }}
                  />
                  <button
                    className={styles.btnAdd}
                    onClick={() => handleAddTask(date, day)}
                    disabled={!updatedTaskTexts[day - 1]}
                  >
                    <FaPlus size={18} />
                  </button>
                </footer>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};
