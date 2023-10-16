import { useEffect, useState } from "react";
import { NotFound } from "../../../NotFound";
import { Loader } from "../../../../components/Loader";
import img from "../../../../assets/imgs/defaultImg.png";
import styles from "./read.module.css";

interface IPost {
  image: string;
  title: string;
  date: string;
  author: string;
  text: string;
}

export function ReadPost() {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPost({
        image: img,
        title: "A importância da Informação",
        date: "21/05/2023",
        author: "Francisco Jr",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className={styles.containerLoader}>
        <Loader />
      </div>
    );
  }

  if (!loading && !post) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      <main>
        <img src={post?.image} alt={post?.title} />

        <h1 className={styles.title}>{post?.title}</h1>

        <header>
          <span className={styles.date}>{post?.date}</span>

          <span className={styles.author}>
            <b>Autor:</b> {post?.author}
          </span>
        </header>

        <p className={styles.text}>{post?.text}</p>
      </main>
    </div>
  );
}
