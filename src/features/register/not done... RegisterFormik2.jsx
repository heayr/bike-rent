// !По идее нужно придти к чему-то такому, но оно не готово от слова совсем

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().required,
  passwordConfirm: yup
    .string()
    .nullable(true)
    .required()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

// const selectEmail = (state) => state.register.email;
// const selectPassword = (state) => state.register.password;

const Register = () => {
  const dispatch = useDispatch();
  // const email = useSelector(selectEmail);
  // const password = useSelector(selectPassword);
  // const updateValFromStore = useDebouncedCallback((key, val) => {
  //   console.log({ key, val });
  //   dispatch(updateVal({ key, val }));
  // }, 250);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          clientId: "",
          approved: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="Имя"
                onChange={(_, event) => {
                  handleChange(event);
                  // updateValFromStore("firstName", val);
                }}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
                onChange={(_, event) => {
                  handleChange(event);
                  // updateValFromStore("lastName", val);
                }}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={(_, event) => {
                  handleChange(event);
                  // updateValFromStore("email", val);
                }}
                onBlur={handleBlur}
                value={values.email}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(_, event) => {
                  handleChange(event);
                  // updateValFromStore("password", val);
                }}
                onBlur={handleBlur}
                value={values.password}
              />
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="passwordConfirmation"
                onChange={(_, event) => {
                  handleChange(event);
                  // updateValFromStore("passwordConfirmation", val);
                }}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
              />
              <button type="submit" disabled={!isValid}>
                Зарегистрироваться
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
