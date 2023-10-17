import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { daysOfWeek } from "../../../constants/daysOfWeek";
import styles from "./tasks.module.css";

export const Tasks = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [numberOfDays, setNumberOfDays] = useState(new Date().getMonth());
  const [tasksList, setTasksList] = useState([
    {
      id: 1,
      text: "Estudar React",
      date: "Tue Oct 20 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
      checked: true,
    },
  ]);
  const [newTaskTexts, setNewTaskTexts] = useState(
    Array(numberOfDays).fill("")
  );

  useEffect(() => {
    const lastDayOfMonth = new Date(
      new Date().getFullYear(),
      selectedMonth + 1,
      0
    );

    setNumberOfDays(lastDayOfMonth.getDate());
  }, [selectedMonth]);

  function handleChangeTasksList(id: number | string) {
    const updatedTasks = tasksList.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasksList(updatedTasks);
  }

  function handleAddTask(date: Date, day: number) {
    setNewTaskTexts((prevTaskTexts) => {
      const currentTaskText = prevTaskTexts[day - 1];

      if (currentTaskText.trim() === "") {
        return prevTaskTexts;
      }

      const newTask = {
        id: tasksList.length + 1,
        text: currentTaskText,
        date: `${date}`,
        checked: false,
      };

      setTasksList((state) => [...state, newTask]);

      const updatedTaskTexts = [...prevTaskTexts];
      updatedTaskTexts[day - 1] = "";
      return updatedTaskTexts;
    });
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
                          <li key={task.id}>
                            <input
                              type="checkbox"
                              onChange={() => handleChangeTasksList(task.id)}
                              checked={task.checked}
                              id={`check-task-${task.id}`}
                            />
                            <label htmlFor={`check-task-${task.id}`}>
                              {task.text}
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
                    <FaPlus />
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
