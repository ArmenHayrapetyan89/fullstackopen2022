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

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!(body.title || body.url)) {
    return response.status(400).json({ error: "title and url are required!" });
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = user.blogs.filter(
      (blog) => blog._id.toString() === request.params.id
    );

    if (blog.length == 0) {
      return response
        .status(401)
        .json({ error: "This user has no blogs or the wrong token" });
    }

    const [blogId] = blog;

    const foundBlog = await Blog.findById(blogId._id.toString());

    if (foundBlog != null && foundBlog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(404)
        .json({ error: `No blog with id: ${request.params.id}` });
    }
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const blog = user.blogs.filter(
    (blog) => blog._id.toString() === request.params.id
  );

  if (blog.length == 0) {
    return response
      .status(401)
      .json({ error: "This user has no blogs or the wrong token" });
  }

  const [blogId] = blog;

  const foundBlog = await Blog.findById(blogId._id.toString());

  foundBlog.likes = request.body.likes;

  if (foundBlog != null && foundBlog.user.toString() === user.id) {
    await Blog.findByIdAndUpdate(request.params.id, foundBlog);
    response.status(200).end();
  } else {
    return response
      .status(404)
      .json({ error: `No blog with id: ${request.params.id}` });
  }
});

blogsRouter.put(
  "/:id/comments",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const body = request.body;

    const blog = user.blogs.filter(
      (blog) => blog._id.toString() === request.params.id
    );

    if (blog.length == 0) {
      return response
        .status(401)
        .json({ error: "This user has no blogs or the wrong token" });
    }

    const [blogId] = blog;

    const foundBlog = await Blog.findById(blogId._id.toString());

    foundBlog.comments = [...foundBlog.comments.concat(body.comments)];

    if (foundBlog != null && foundBlog.user.toString() === user.id) {
      await Blog.findByIdAndUpdate(request.params.id, foundBlog);
      response.status(200).end();
    } else {
      return response
        .status(404)
        .json({ error: `No blog with id: ${request.params.id}` });
    }
  }
);

module.exports = blogsRouter;
