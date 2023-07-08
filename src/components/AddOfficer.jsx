// import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOfficerCredentials } from "../features/registerOfficer/registerOfficerSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useGiveAdminRightsMutation } from "../features/registerOfficer/registerOfficerApiSlice";
import { Link } from "react-router-dom";


const AddOfficer = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  const approvedRef = useRef();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clientId] = nanoid();
  const [approved, setApproved] = useState("true");

  const navigate = useNavigate();

  const [registerOfficer, { isLoading }] = useGiveAdminRightsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await registerOfficer({
        firstName,
        lastName,
        email,
        password,
        clientId,
        approved,
      }).unwrap();
      console.log(userData);
      dispatch(setOfficerCredentials({ ...userData, email }));
      setfirstName("");
      setlastName("");
      setEmail("");
      clientId("");
      setPwd("");
      setApproved("true");
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
    <section className="registerOfficer">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Добавить Офицера</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">firstName:</label>
        <input
          type="text"
          id="firstName"
          ref={firstNameRef}
          value={firstName}
          onChange={handlefirstNameInput}
          autoComplete="off"
          required
        />
        <label htmlFor="lastName">lastName:</label>
        <input
          type="text"
          id="lastName"
          ref={lastNameRef}
          value={lastName}
          onChange={handlelastNameInput}
          autoComplete="off"
          required
        />
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
          ref={passwordRef}
          value={password}
          required
        />
        {/* <input type="checkbox" id="admin" checked ref={approvedRef}/> */}

        <button>Add ADMIN</button>
      </form>

      <Link to="/welcome">Начальная страница</Link>

    </section>
  );

  return content;
};

console.log("я тут");

export default AddOfficer;
