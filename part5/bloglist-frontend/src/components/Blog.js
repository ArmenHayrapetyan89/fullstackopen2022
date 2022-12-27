const Blog = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} {blog.author}
        </p>
      ))}
    </div>
  );
};

export default Blog;
