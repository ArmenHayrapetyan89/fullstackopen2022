import { useParams } from "react-router-dom";

const User = (props) => {
  const id = useParams().id;
  const actualUser = props.users.find((user) => user.id === id);

  if (!actualUser) {
    return <div>Loading...</div>;
  }

  const blogs = [...actualUser.blogs];

  console.log("BLOGS: ", blogs);

  return (
    <div>
      <h2>{actualUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
