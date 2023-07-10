import { Link } from "react-router-dom";
import styles from "./public.module.css";

const Public = () => {
  const content = (
    <section >
      <header className={styles.header}>
        <h1 className={styles.header__title}>Велопрокат</h1>
        <div>
        <Link className={styles.link} to="/login">Логин </Link>
        <Link className={styles.link} to="/register">Регистрация</Link>
        </div>

      </header>
      <main className={styles.main} >
      </main>
      <footer className={styles.footer}>
        <p>footer</p>
      </footer>
    </section>
  );
  return content;
};

export default Public;
