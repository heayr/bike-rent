import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/editOfficer/editDataSlice";
import { useGetUserMutation } from "../features/users/usersApiSlice";
// import { usePushUserQuery } from "../features/users/getUserApiSlice";

const GetOfficerId = () => {
  const idRef = useRef();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [change, { isLoading }] = useGetUserMutation();
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  
  //  no need
  const dispatch = useDispatch();
  useEffect(() => {
    setErrMsg("");
  }, [id]);
  //  no need

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await change({
        id,
      }).unwrap();
      dispatch(setCredentials({ ...userData, id }));
      setId("");
      navigate("/officer");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No server response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
      }
      errRef.current.focus();
    }
  };
    const handleIdInput = (e) => setId(e.target.value);

    const content = isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <section className="editOfficer">
        <form onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Id Офицера </h1>
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
          <button type="submit"> Id of ADMIN</button>
        </form>
      </section>
    );


  return content;

};

export default GetOfficerId;
