import { Button } from "../../../../components";
import { FormGroup } from "../../../../components/FormGroup";
import defaultImage from "../../../../assets/imgs/defaultImg.png";
import styles from "./createPost.module.css";

export function CreatePost() {
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
        <FormGroup label="Digite seu título" placeholder="Título..." />

        <textarea
          className={styles.postContent}
          placeholder="Era uma vez..."
        ></textarea>
      </form>
    </div>
  );
}
