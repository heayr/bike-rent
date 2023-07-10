import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/editOfficer/editDataSlice";
import { useEditOfficerMutation } from "../features/editOfficer/editDataApiSlice";


const EditOfficer = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  const approvedRef = useRef();
  const idRef = useRef();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [approved, setApproved] = useState(false);
  const [id, setId] = useState("");

// булево значение приделать 
  // const [cheked, setCheked] = useState(false);

  const navigate = useNavigate();

  const [change, { isLoading }] = useEditOfficerMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, password, firstName, lastName, approved, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await change({
        firstName,
        lastName,
        email,
        password,
        approved,
        id,
      }).unwrap();
      console.log("измененный офицер:", userData);
      dispatch(setCredentials({ ...userData, email, id }));
      setfirstName("");
      setlastName("");
      setEmail("");
      setId("");
      setPwd("");
      setApproved("");
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
  // const handleApproved = (e) => setApproved(e.target.value);
  const handleIdInput = (e) => setId(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="editOfficer">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Изменить Офицера </h1>
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
          <label htmlFor="id">id:</label>
        <input
          type="text"
          id="id"
          ref={idRef}
          value={id}
          onChange={handleIdInput}
          autoComplete="off"
          required
        />
        <label htmlFor="approved">Approved:</label>
        <input
          type="checkbox"
          id="approved"
          ref={approvedRef}
          // checked={cheked}
          onChange={() => setApproved(!approved)}
        />

        <button type="submit" > Edit Data of ADMIN</button>
      </form>
    </section>
    
  );

  return content;

};


console.log('edit officers');

export default EditOfficer;