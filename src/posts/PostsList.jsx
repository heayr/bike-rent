import { Link } from "react-router-dom";
import { useGetPostsQuery } from './postsSliceApi';

const PostsList = () => {
    const {
        data : posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery();

    let content;
if (isLoading) {
    content = <p>"Loading..."</p>;
} else if (isSuccess) {
    content = (
        <section className="posts" >
            <h1>Случаи Воровства:</h1>
            <ul>
                {posts.data.map((post, i) => {
                    return(
                        <li key={i}>
                            Тип: {post.type}, 
                            Id: {post._id}, 
                            № Лицензии: {post.licenseNumber},
                            ФИО Владельца: {post.ownerFullName},
                            Id Клиента: {post.clientId},
                            Создано: {post.createdAt},
                            Дата События: {post.date},
                            Описание: {post.description},
                        </li>
                    )
                })}
            </ul>
        <Link to="/welcome">Back to Welcome</Link>

        </section>
    );
} else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;



} 

export default PostsList;