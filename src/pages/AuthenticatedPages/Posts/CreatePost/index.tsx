import { useState, useEffect } from "react";
import { FormGroup, FooterCreate, PageLoading } from "../../../../components";
import { AuthenticatedPaths } from "../../../../constants/paths";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"; // Importe o módulo de armazenamento apropriado
import { firebaseApp } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createPost.module.css";

export function CreatePost() {
  const { user } = useAuth();
  const { id } = useParams();
  const db = getFirestore(firebaseApp);

  const postsCollection = collection(db, "posts");
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [disabledBtnConfirm, setDisabledBtnConfirm] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [imageToEdit, setImageToEdit] = useState("");

  async function loadPost() {
    setLoadingPage(true);

    try {
      const postRef = doc(db, "posts", `${id}`);
      const post = await getDoc(postRef);

      console.log(post.data());

      setTitle(post.data()!.title);
      setText(post.data()!.text);
      setImageToEdit(post.data()!.image);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      loadPost();
    }

    setLoadingPage(false);
  }, []);

  useEffect(() => {
    if (title.length < 3 || text.length < 20) {
      setDisabledBtnConfirm(true);
    } else {
      setDisabledBtnConfirm(false);
    }
  }, [title, text]);

  async function handleCreatePost() {
    setLoadingPage(true);

    const taskUID = uuidv4();
    const newPost = {
      uid: taskUID,
      text: text,
      title: title,
      date: `${new Date()}`,
      userId: user?.uid,
      userName: user?.name,
      image: "",
    };

    if (image) {
      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${taskUID}.jpg`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
        newPost.image = imageURL;
      } catch (error) {
        console.error("Erro ao fazer upload da imagem: ", error);
        return;
      } finally {
        setLoadingPage(false);
        setText("");
        setImage(null);
        setTitle("");
      }
    }

    try {
      await setDoc(doc(postsCollection, taskUID), newPost);

      setText("");
      setTitle("");
      setImage(null);
      navigate("/posts");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar post:", error.message);
    }
  }

  async function handleEditPost() {
    setLoadingPage(true);

    const postRef = doc(db, "posts", String(id));

    try {
      const updatedData = {
        title,
        text,
        image: "",
      };

      if (image !== null) {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${id}.jpg`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
        updatedData.image = imageURL;
      } else {
        updatedData.image = imageToEdit;
      }

      await updateDoc(postRef, updatedData);

      navigate("/posts");
    } catch (error) {
      console.error("Erro ao editar post:", error);
    } finally {
      setLoadingPage(false);
      setText("");
      setTitle("");
      setImage(null);
      setImageToEdit("");
    }
  }

  if (loadingPage) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Novo post</h1>
      </header>

      <section className={styles.uploadImageContainer}>
        <img
          src={
            image !== null
              ? URL.createObjectURL(image)
              : imageToEdit.length
              ? imageToEdit
              : defaultImage
          }
          alt="Imagem de um triângulo, um quadrado e um círculo cinzas"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files && e.target.files[0];
            if (selectedFile) {
              setImage(selectedFile);
            }
          }}
        />
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
        onConfirm={isEdit ? handleEditPost : handleCreatePost}
      />
    </div>
  );
}
