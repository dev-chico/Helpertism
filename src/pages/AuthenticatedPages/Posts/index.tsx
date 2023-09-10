import { Link } from "react-router-dom";
import { Button } from "../../../components";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { postsMock } from "./mock";
import { Card, ICard } from "../../../components/Card";
import { NoDataView } from "../../../components/NoDataView/NoDataView";
import styles from "./posts.module.css";

export function Posts() {
  const [postsList, setPostsList] = useState<ICard[]>([]);

  useEffect(() => {
    setPostsList(postsMock);
  }, []);

  return (
    <div className={styles.container}>
      {postsList.length > 0 && (
        <header className={styles.header}>
          <h1>Últimos posts</h1>
          <Link to="/">
            <Button small bgColor="orange">
              <FaPlus /> Novo post
            </Button>
          </Link>
        </header>
      )}

      <main className={styles.content}>
        {postsList.length > 0 &&
          postsList.map((post: ICard) => (
            <Card
              key={post.id}
              id={post.id}
              img={post.img}
              title={post.title}
              date={post.date}
              description={post.description}
            >
              <Button small>Ler</Button>
            </Card>
          ))}
      </main>

      {!postsList.length && <NoDataView text="Crie seu primeiro post" />}
    </div>
  );
}
