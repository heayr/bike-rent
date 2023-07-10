import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    //! переменная data, которая содержит массив officers - переименовали в users
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  // console.log(UsersList);
  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {/* при успехе здесь будет список пользователей */}

          {/* //! здесь из users взяли объект officers,
          //! внутри которого массив обхектов пользоваталей и оно теперь рендериться */}
          {users.officers.map((user, i) => {
            return (
              <li key={i}>
                Имя: {user.firstName}, Фамилия: {user.lastName}, Почта:{" "}
                {user.email}, approved: {user.approved ? 'Подтверждено' : 'Не Подтверждено'}, id: {user._id}, пароль:{" "}
                {user.password}
              </li>
            );
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};


export default UsersList;
