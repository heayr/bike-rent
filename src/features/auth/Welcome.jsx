import { useSelector } from "react-redux";
// import { useRef, useState, useEffect } from "react";
// import  GetOfficerId  from '../../components/GetOfficerId';

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
  // const clientIdRef = useRef();
  // const [clientId, setClientId] = useState("");
  // const handleClientIdInput = (e) => setClientId(e.target.value);



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
            {/* <form > */}
            {/* <label htmlFor="clientId">clientId:</label> */}
        {/* <input
          type="text"
          id="clientId"
          ref={clientIdRef}
          value={clientId}
          onChange={handleClientIdInput}
          autoComplete="off"
          required
        /> */}
            <Link to='/editofficer' >Редактировать админа</Link>
            <Link to='/officerid' >ID админа</Link>
            {/* <Link to={`/officerid/${id}`} >ID админа</Link> */}

            {/* <Link to='/officer' >ID админа</Link> */}
            {/* <GetOfficerId/> */}

            {/* </form> */}
          </p>
          <p>{approvedAbbr}</p>

          <Link to='/post' >Добавить случай Воровства</Link>
        </>
      )}
    </section>
  );

  return content;
};

  export default Welcome;