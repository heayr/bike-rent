import { useGetUserMutation } from "../features/users/usersApiSlice";
import { useGetUser2Query } from "../features/users/usersApiSlice";
import { Link } from "react-router-dom";
import { usePushUserQuery } from "../features/users/getUserApiSlice";

const GetOfficer = () => {
    const {
      //! переменная data, которая содержит массив  - переименовали в user
      data: users,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetUser2Query();
    // console.log(users);
    let content;
    if (isLoading) {
      content = <p>"Loading..."</p>;
    } else if (isSuccess) {
      content = (
        <section className="user">
          <h1>Officer</h1>
          <ul>
            {/* при успехе здесь будет список пользователей */}
  
            {/* //! здесь из users взяли объект officers,
            //! внутри которого массив обхектов пользоваталей и оно теперь рендериться */}
            {users.map((user, i) => {
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

  export default GetOfficer;