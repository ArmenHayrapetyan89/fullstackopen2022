const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  console.log("DECODEDTOKEN: ", decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = user.blogs.filter(
    (blog) => blog._id.toString() === request.params.id
  );

  console.log("BLOG:::::::::", blog);

  if (blog.length == 0) {
    return response
      .status(401)
      .json({ error: "This user has no blogs or the wrong token" });
  }

  const [blogId] = blog;

  const foundBlog = await Blog.findById(blogId._id.toString());

  if (foundBlog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body);
  response.status(200).end();
});

module.exports = blogsRouter;

/**{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhzaW1wc29uIiwiaWQiOiI2M2E3MjcxNzE5OTM3N2QxODNhZWJlNDQiLCJpYXQiOjE2NzE5MDU0ODF9.MpkMh8eMgcj8QLcjyn9g_4MsjOwtMCsprl8gsOVheYY",
    "username": "hsimpson",
    "name": "Homer Simpson"
} */
