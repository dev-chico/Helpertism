import { useState, useEffect } from "react";
import { Button } from "../../../../components";
import { FormGroup } from "../../../../components/FormGroup";
import { FooterCreate } from "../../../../components/FooterCreate";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createPost.module.css";
import { useNavigate } from "react-router-dom";

export function CreatePost() {
  const { user } = useAuth();
  const db = getFirestore(firebaseApp);
  const postsCollection = collection(db, "posts");
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [disabledBtnConfirm, setDisabledBtnConfirm] = useState<boolean>(true);

  useEffect(() => {
    if (title.length < 3 || text.length < 20) {
      setDisabledBtnConfirm(true);
    } else {
      setDisabledBtnConfirm(false);
    }
  }, [title, text]);

  async function handleCreatePost() {
    const taskUID = uuidv4();
    const newPost = {
      uid: taskUID,
      text: text,
      title: title,
      date: `${new Date()}`,
      userId: user?.uid,
    };

    try {
      await setDoc(doc(postsCollection, taskUID), newPost);

      setText("");
      setTitle("");
      navigate("/posts");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar post:", error.message);
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Novo post</h1>
      </header>

      <section className={styles.uploadImageContainer}>
        <img
          src={defaultImage}
          alt="Imagem de um triângulo, um quadrado e um círculo cinzas"
        />
        <Button small bgColor="gray">
          Escolher arquivo
        </Button>
      </section>

      <form>
        <FormGroup
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Digite seu título"
          placeholder="Título..."
        />

        <textarea
          className={styles.postContent}
          placeholder="Era uma vez..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </form>

      <FooterCreate
        disabled={disabledBtnConfirm}
        pathToCancel={AuthenticatedPaths.posts.home}
        onConfirm={handleCreatePost}
      />
    </div>
  );
}
