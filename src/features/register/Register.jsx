import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./registerSlice";
import { useRegisterMutation } from "./registerApiSlice";
import { nanoid } from "@reduxjs/toolkit";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clientId, setclientId] = nanoid();
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();



  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await register({
        firstName,
        lastName,
        email,
        password,
        clientId,
      }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, email }));
      setfirstName("");
      setlastName("");
      setEmail("");
      clientId("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No server response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handlefirstNameInput = (e) => setfirstName(e.target.value);
  const handlelastNameInput = (e) => setlastName(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Employee Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );

  return content;
};

export default Register;

// // import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { uuid } from "uuid";
// import { nanoid } from "@reduxjs/toolkit";

// import { useRef, useState, useEffect } from "react";
// import {
//   faCheck,
//   faTimes,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// // const REGISTER_URL = "/api/auth/sign_up";
// const REGISTER_URL =
//   "https://sf-final-project-be.herokuapp.com/api/auth/sign_up";

// const Register = () => {
//   // const firstName = useRef();
//   // const surname = useRef();
//   const userRef = useRef();
//   const errRef = useRef();
//   const emailRef = useRef();

//   const [email, setEmail] = useState("");
//   const [id, setId] = useState(nanoid);

//   const [firstName, setfirstName] = useState();
//   const [validfirstName, setValidName] = useState(false);
//   const [firstNameFocus, setfirstNameFocus] = useState(false);

//   const [lastName, setlastName] = useState();
//   const [validlastName, setValidSurname] = useState(false);
//   const [lastNameFocus, setlastNameFocus] = useState(false);

//   const [pwd, setPwd] = useState("");
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState("");
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     emailRef.current.focus();
//   }, []);

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setValidName(USER_REGEX.test(firstName, lastName));
//   }, [firstName, lastName]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   useEffect(() => {
//     setErrMsg("");
//   }, [firstName, lastName, pwd, matchPwd]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if button enabled with JS hack
//     const v1 = USER_REGEX.test(firstName, lastName);
//     const v2 = PWD_REGEX.test(pwd);
//     if (!v1 || !v2) {
//       setErrMsg("Invalid Entry");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         REGISTER_URL,
//         JSON.stringify({ email, firstName, lastName, pwd, id }),
//         {
//           headers: { "Content-Type": "application/json" },
//           //   withCredentials: true,
//         }
//       );
//       console.log(response?.data);
//       console.log(response?.accessToken);
//       console.log(JSON.stringify(response));
//       setSuccess(true);
//       //clear state and controlled inputs
//       //need value attrib on inputs for this
//       setEmail("");
//       setfirstName("");
//       setlastName("");
//       setPwd("");
//       setMatchPwd("");
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 409) {
//         setErrMsg("Username Taken");
//       } else {
//         setErrMsg("Registration Failed");
//       }
//       errRef.current.focus();
//     }
//   };

//   return (
//     <>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p>
//             <a href="#">Sign In</a>
//           </p>
//         </section>
//       ) : (
//         <section>
//           <p
//             ref={errRef}
//             className={errMsg ? "errmsg" : "offscreen"}
//             aria-live="assertive"
//           >
//             {errMsg}
//           </p>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             {/* //!ЗДЕСЬ СДЕЛАТЬ ИНПУТ ДЛЯ ИМЕЙЛА   */}
//             <label htmlFor="firstName">
//               firstName:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validfirstName ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validfirstName || !firstName ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="text"
//               id="username"
//               ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setfirstName(e.target.value)}
//               value={firstName}
//               required
//               aria-invalid={validfirstName ? "false" : "true"}
//               aria-describedby="uidnote"
//               onFocus={() => setfirstNameFocus(true)}
//               onBlur={() => setfirstNameFocus(false)}
//             />
//             <p
//               id="uidnote"
//               className={
//                 firstNameFocus && firstName && !validfirstName
//                   ? "instructions"
//                   : "offscreen"
//               }
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               4 to 24 characters.
//               <br />
//               Must begin with a letter.
//               <br />
//               Letters, numbers, underscores, hyphens allowed.
//             </p>

//             <label htmlFor="password">
//               Password:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validPwd ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validPwd || !pwd ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="password"
//               id="password"
//               onChange={(e) => setPwd(e.target.value)}
//               value={pwd}
//               required
//               aria-invalid={validPwd ? "false" : "true"}
//               aria-describedby="pwdnote"
//               onFocus={() => setPwdFocus(true)}
//               onBlur={() => setPwdFocus(false)}
//             />
//             <p
//               id="pwdnote"
//               className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               8 to 24 characters.
//               <br />
//               Must include uppercase and lowercase letters, a number and a
//               special character.
//               <br />
//               Allowed special characters:{" "}
//               <span aria-label="exclamation mark">!</span>{" "}
//               <span aria-label="at symbol">@</span>{" "}
//               <span aria-label="hashtag">#</span>{" "}
//               <span aria-label="dollar sign">$</span>{" "}
//               <span aria-label="percent">%</span>
//             </p>

//             <label htmlFor="confirm_pwd">
//               Confirm Password:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validMatch && matchPwd ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validMatch || !matchPwd ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="password"
//               id="confirm_pwd"
//               onChange={(e) => setMatchPwd(e.target.value)}
//               value={matchPwd}
//               required
//               aria-invalid={validMatch ? "false" : "true"}
//               aria-describedby="confirmnote"
//               onFocus={() => setMatchFocus(true)}
//               onBlur={() => setMatchFocus(false)}
//             />
//             <p
//               id="confirmnote"
//               className={
//                 matchFocus && !validMatch ? "instructions" : "offscreen"
//               }
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               Must match the first password input field.
//             </p>

//             <button
//               disabled={
//                 !validfirstName || !validPwd || !validMatch ? true : false
//               }
//             >
//               Sign Up
//             </button>
//           </form>
//           <p>
//             Уже зарегистрированы?
//             <br />
//             <span className="line">
//               {/*put router link here*/}
//               <Link to="/">Войти</Link>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// };
// export default Register;
