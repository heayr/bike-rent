import { useSelector } from "react-redux";
import style from "./welcome.module.css";
import {
  selectCurrentUser,
  selectCurrentToken,
  selectApproved,
} from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const email = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const approved = useSelector(selectApproved);
  const welcome = email ? `Welcome ${email}!` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;
  const approvedAbbr = approved ? "Подтвержденный аккаунт =)" : "Not Approved";
  const content = (
    <>
      <h1 className={style.title}>{welcome}</h1>

      <section className={style.welcome}>
        {/* <p>Token: {tokenAbbr}</p> */}
        <p>{approvedAbbr}</p>
        {approved && (
          <>
            <ul className={style.list} >
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/userslist">Go to the Users List</Link>
              </li>

              <li className={style.list_item} >
                <Link className={style.list_item_link} to="/addofficer">Добавить админа</Link>
              </li>
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/editofficer">Редактировать админа</Link>
              </li>
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/officerid">ID админа</Link>
              </li>
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/post">Добавить случай Воровства</Link>
              </li>
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/postslist">Список известных случаев</Link>
              </li>
              <li className={style.list_item}>
                <Link className={style.list_item_link} to="/editpost"> редактировать случай </Link>
              </li>
            </ul>
          </>
        )}
      </section>
    </>
  );

  return content;
};

export default Welcome;
