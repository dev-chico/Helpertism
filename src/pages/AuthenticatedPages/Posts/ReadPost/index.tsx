import { useEffect, useState } from "react";
import { Loader } from "../../../../components/Loader";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../../services/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { Button } from "../../../../components";
import img from "../../../../assets/imgs/defaultImg.png";
import styles from "./read.module.css";

interface IPost {
  image?: string;
  title: string;
  date: string;
  author: string;
  text: string;
}

export function ReadPost() {
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadPost() {
    setLoading(true);

    try {
      const postRef = doc(db, "posts", `${id}`);
      const post = await getDoc(postRef);

      setPost({
        author: post.data()!.userName,
        date: post.data()!.date,
        text: post.data()!.text,
        title: post.data()!.title,
        image: post.data()!.image ? post.data()!.image : img,
      });
    } catch (error) {
      console.error("Erro ao buscar post:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return (
      <div className={styles.containerLoader}>
        <Loader />
      </div>
    );
  }

  if (!loading && !post) {
    navigate("/posts");
    return;
  }

  return (
    <div className={styles.container}>
      <Link to={AuthenticatedPaths.posts.home}>
        <Button small bgColor="blue">
          Voltar
        </Button>
      </Link>
      <main>
        <img src={post?.image} alt={post?.title} />

        <h1 className={styles.title}>{post?.title}</h1>

        <header>
          <span className={styles.date}>
            {new Date(post!.date).toLocaleDateString()}
          </span>

          <span className={styles.author}>
            <b>Autor:</b> {post?.author}
          </span>
        </header>

        <p className={styles.text}>{post?.text}</p>
      </main>
    </div>
  );
}
