// import { useFormik } from "formik";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import uniqid from "uniqid";
// import { nanoid } from "nanoid";

// const REGISTER_URL = "https://sf-final-project-be.herokuapp.com/api/auth/";

// // const id = nanoid();
// // const uniqid = uniqid();

// const register = (firstName, lastName, email, password, clientId, approved) => {
//   return axios.post(REGISTER_URL + "sign_up", {
//     firstName,
//     lastName,
//     email,
//     password,
//     clientId,
//     approved,
//   });
// };

// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Заполните Имя";
//   } else if (!values.firstName.length > 15) {
//     errors.firstName = "Должно быть 15 символов или меньше";
//   }
//   if (!values.lastName) {
//     errors.lastName = "Заполните Фамилию";
//   } else if (!values.lastName.length > 20) {
//     errors.lastName = "Должно быть 20 символов или меньше";
//   }
//   if (!values.email) {
//     errors.email = "Заполните email";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Неправильный адрес почты";
//   }
//   if (!values.password) {
//     errors.password = "Заполните пароль";
//   } else if (values.password.length < 5) {
//     errors.password = "Должно быть не менее 5 символов";
//   }

//   return errors;
// };

// // const response = await axios.post(
// //   REGISTER_URL,
// //   JSON.stringify({ email, firstName, lastName, pwd, id }),
// //   {
// //     headers: { "Content-Type": "application/json" },
// //     //   withCredentials: true,
// //   }
// // );

// const SignupForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       clientId: uniqid(),
//     },
//     validate,
//     onSubmit: register(),
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">Имя</label>
//       <input
//         type="text"
//         id="firstName"
//         name="firstName"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.firstName}
//       />
//       {formik.touched.firstName && formik.errors.firstName ? (
//         <div>{formik.errors.firstName}</div>
//       ) : null}
//       <label htmlFor="lastName">Фамилия</label>
//       <input
//         type="text"
//         id="lastName"
//         name="lastName"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.lastName}
//       />
//       {formik.touched.lastName && formik.errors.lastName ? (
//         <div>{formik.errors.lastName}</div>
//       ) : null}
//       <label htmlFor="email">Email Адрес</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div>{formik.errors.email}</div>
//       ) : null}
//       <label htmlFor="password">Пароль</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.password}
//       />
//       {formik.touched.password && formik.errors.password ? (
//         <div>{formik.errors.password}</div>
//       ) : null}
//       <button type="submit">Зарегистрироваться</button>
//     </form>
//   );
// };

// export default SignupForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Field, Form, ErrorMessage } from "formik";

// import * as Yup from "yup";

// import { register } from "./registerSlice";
// import { clearMessage } from "./message";
// import { nanoid } from "@reduxjs/toolkit";

// // const uniid = uniqid();

// const Register = () => {
//   const [successful, setSuccessful] = useState(false);

//   const { message } = useSelector((state) => state.message);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(clearMessage());
//   }, [dispatch]);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     clientId: nanoid(),
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .test(
//         "len",
//         "The firstName must be between 3 and 20 characters.",
//         (val) =>
//           val && val.toString().length >= 3 && val.toString().length <= 20
//       )
//       .required("This field is required!"),
//     lastName: Yup.string()
//       .test(
//         "len",
//         "The lastName must be between 3 and 20 characters.",
//         (val) =>
//           val && val.toString().length >= 3 && val.toString().length <= 20
//       )
//       .required("This field is required!"),
//     email: Yup.string()
//       .email("This is not a valid email.")
//       .required("This field is required!"),
//     password: Yup.string()
//       .test(
//         "len",
//         "The password must be between 6 and 40 characters.",
//         (val) =>
//           val && val.toString().length >= 6 && val.toString().length <= 40
//       )
//       .required("This field is required!"),
//   });

//   const handleRegister = (formValue) => {
//     const { firstName, lastName, email, password, clientId } = formValue;

//     setSuccessful(false);

//     dispatch(register({ firstName, lastName, email, password, clientId }))
//       .unwrap()
//       .then(() => {
//         setSuccessful(true);
//       })
//       .catch(() => {
//         setSuccessful(false);
//       });
//   };

//   return (
//     <div className="col-md-12 signup-form">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleRegister}
//         >
//           <Form>
//             {!successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="firstName">firstName</label>
//                   <Field
//                     name="firstName"
//                     type="text"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="firstName"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lastName">lastName</label>
//                   <Field name="lastName" type="text" className="form-control" />
//                   <ErrorMessage
//                     name="lastName"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Field name="email" type="email" className="form-control" />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Field
//                     name="password"
//                     type="password"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button type="submit" className="btn btn-primary btn-block">
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             )}
//           </Form>
//         </Formik>
//       </div>

//       {message && (
//         <div className="form-group">
//           <div
//             className={
//               successful ? "alert alert-success" : "alert alert-danger"
//             }
//             role="alert"
//           >
//             {message}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;
