import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { FaArrowUp } from "react-icons/fa";
import styles from "./pageLayout.module.css";

interface IPageLayoutProps {
  children?: ReactNode;
}

export function PageLayout({ children }: IPageLayoutProps) {
  const viewSize = window.innerWidth;
  const [pageYPosition, setPageYPosition] = useState(0);

  function getPageYAfterScroll() {
    setPageYPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", getPageYAfterScroll);
    return () => window.removeEventListener("scroll", getPageYAfterScroll);
  }, []);

  function backToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div className={`${styles.container} ${viewSize < 900 && styles.mobile}`}>
      <section className={styles.header}>
        <Header />
      </section>

      {viewSize > 900 && (
        <section className={styles.menu}>
          <Menu />
        </section>
      )}

      <main className={styles.content}>{children}</main>

      <button
        type="button"
        className={`${styles.backToTop} ${
          pageYPosition > 400 && styles.visible
        }`}
        onClick={backToTop}
      >
        <FaArrowUp size={28} color="#FFF" />
      </button>
    </div>
  );
}
