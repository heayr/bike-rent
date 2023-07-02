import { Link } from "react-router-dom";
import css from "./style.css";

const Public = () => {
  const content = (
    <section>
      <header className={css.header}>
        <h1 className={css.header__title}>Велопрокат</h1>
        <Link to="/login">Логин </Link>
        <br />
        <Link to="/register">Регистрация</Link>
      </header>
      <main>
        <p>здесь будет типа инфоблок</p>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </section>
  );
  return content;
};

export default Public;
