import { Link } from "react-router-dom";

const Blogs = (props) => (
  <div>
    <div className="title-author">
      {props.blogs.map((blog) => (
        <div style={props.blogstyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Blogs;
