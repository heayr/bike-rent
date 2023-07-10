import {useEditPostMutation, useGetPostsQuery} from './postsSliceApi'
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from './postsSlice';





const EditPost = () => {
    const licenseNumberRef = useRef();
    const ownerFullNameRef = useRef();
    const typeRef = useRef();
    const dateRef = useRef();
    const idRef = useRef();
    const descriptionRef = useRef();
  const errRef = useRef();


 const [licenseNumber, setlicenseNumber] = useState('');
    const [ownerFullName, setOwnerFullName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [errMsg, setErrMsg] = useState("");
// console.log( 'номер лицензии', licenseNum);
  const navigate = useNavigate();

  const [createPost, {isLoading}] = useEditPostMutation();
const dispatch = useDispatch();


useEffect(() => {
    setErrMsg('');
}, [licenseNumber, ownerFullName, type]
);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await createPost({
            licenseNumber,
            ownerFullName,
            type,
            date,
            id,
            description,
        }).unwrap();
        dispatch(setCredentials({ ...userData, 
            licenseNumber, ownerFullName, type,
            }))
            setlicenseNumber('');
            setOwnerFullName('');
            setType('');
            setDate('');
            setId('');
            setDescription('');
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

const handleLicenseNumber = (e) => setlicenseNumber(e.target.value);
const handleOwnerFullName = (e) => setOwnerFullName(e.target.value);
const handleType = (e) => setType(e.target.value);
const handleDate = (e) => setDate(e.target.value);
const handleId = (e) => setId(e.target.value);
const handleDescription = (e) => setDescription(e.target.value);

const content = isLoading ? (
    <h1>Loading...</h1>
) : (
    <>

    <section>
        <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>


    <h1>Добавить случай воровства</h1>
    <form onSubmit={handleSubmit}>
        {/*  */}
        <label htmlFor="licenseNumber">licenseNumber:</label>
        <input type="text" 
        id="licenseNumber"
        ref={licenseNumberRef}
        value={licenseNumber}
        // value={ if (licenseNumber === null) { } }
        onChange={handleLicenseNumber}
        autoComplete="off"
        />
        {/*  */}
        <label htmlFor="ownerFullName">ownerFullName:</label>
        <input type="text" 
        id="ownerFullName"
        ref={ownerFullNameRef}
        value={ownerFullName}
        onChange={handleOwnerFullName}
        autoComplete="off"
        />
        {/*  */}
        <label htmlFor="type">type:</label>
        <input type="text" 
        id="type"
        ref={typeRef}
        value={type}
        onChange={handleType}
        autoComplete="off"
        />
        {/*  */}
        <label htmlFor="date">date:</label>
        <input type="text" 
        id="date"
        ref={dateRef}
        value={date}
        onChange={handleDate}
        autoComplete="off"
        />
        {/*  */}
        <label htmlFor="id">id:</label>
        <input type="text" 
        id="id"
        ref={idRef}
        value={id}
        onChange={handleId}
        autoComplete="off"
        />
        {/*  */}
        <label htmlFor="description">description:</label>
        <input type="text" 
        id="description"
        ref={descriptionRef}
        value={description}
        onChange={handleDescription}
        autoComplete="off"
        />
        {/*  */}
        <button>Edit Case</button>

    </form>

    </section>
    </>
);

return content;

};

console.log('редактировать случай ');

export default EditPost;
