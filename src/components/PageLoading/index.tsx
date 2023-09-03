import { Loader } from "../Loader";
import styles from "./pageLoading.module.css";

export function PageLoading() {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
}
