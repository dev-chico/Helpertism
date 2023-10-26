import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Card, ICard } from "../../../../components/Card";
import { NoDataView } from "../../../../components/NoDataView/NoDataView";
import { AuthenticatedPaths } from "../../../../constants/paths";
import { PageLoading } from "../../../../components/PageLoading";
import { firebaseApp } from "../../../../services/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { FaTrash, FaEdit } from "react-icons/fa";
import { DeletePostModal } from "./components/DeletePostModal/DeletePostModal";
import styles from "./posts.module.css";

export function Posts() {
  const db = getFirestore(firebaseApp);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [postsList, setPostsList] = useState<ICard[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [uidToDelete, setUidToDelete] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  async function loadPosts() {
    setLoadingPage(true);
    try {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);

      const postsData: ICard[] = [];
      querySnapshot.forEach((doc) => {
        const newPost: ICard = {
          uid: doc.data().uid,
          date: doc.data().date,
          description: doc.data().text,
          userId: doc.data().userId,
          title: doc.data().title,
          text: doc.data().text,
          img: doc.data().image,
        };

        postsData.push(newPost);
      });

      setPostsList(postsData);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleOpenModalDelete(id: string) {
    setShowModalDelete(true);
    setUidToDelete(id);
  }

  function handleCloseModalDelete() {
    setShowModalDelete(false);
    loadPosts();
  }

  function navigateToEdit(id: string) {
    navigate(`/posts/editar/${id}`);
  }

  if (loadingPage) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      {postsList.length > 0 && (
        <header className={styles.header}>
          <h1>Últimos posts</h1>
          <Link to={AuthenticatedPaths.posts.create}>
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
              key={post.uid}
              uid={post.uid}
              img={post.img}
              title={post.title}
              date={post.date}
              description={post.description}
            >
              <Link to={`${AuthenticatedPaths.posts.read}/${post.uid}`}>
                <Button small>Ler</Button>
              </Link>

              {post.userId === user?.uid && (
                <>
                  <button
                    className={styles.btnAct}
                    onClick={() => handleOpenModalDelete(post.uid)}
                  >
                    <FaTrash color="var(--red)" size={24} />
                  </button>
                  <button
                    className={styles.btnAct}
                    onClick={() => navigateToEdit(post.uid)}
                  >
                    <FaEdit color="var(--yellow)" size={24} />
                  </button>
                </>
              )}
            </Card>
          ))}
      </main>

      {!postsList.length && <NoDataView text="Crie seu primeiro post" />}

      <DeletePostModal
        isOpen={showModalDelete}
        handleToggle={handleCloseModalDelete}
        uid={uidToDelete}
      />
    </div>
  );
}
