import { useSelector } from "react-redux";
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
  console.log(token);
  const welcome = email ? `Welcome ${email}!` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;
  const approvedAbbr = approved ? "Подтвержденный аккаунт =)" : "Not Approved";
  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      {approved && (
        <>
          <p>
            <Link to="/userslist">Go to the Users List</Link>
            <Link to='/addofficer' >Добавить админа</Link>
          </p>
          <p>{approvedAbbr}</p>
        </>
      )}
    </section>
  );

  return content;
};

export default Welcome;
