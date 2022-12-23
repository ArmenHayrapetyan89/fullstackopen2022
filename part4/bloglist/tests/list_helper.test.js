const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listHelper.initialBlogs);
});

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("http requests", () => {
  test("http GET request: ", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(response.body.length);
  });

  test("test for id property: ", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("http POST request: ", async () => {
    const newBlog = {
      title: "TestPost",
      author: "Test",
      url: "www.test.com",
      likes: 30,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogInDB = await listHelper.blogInDB();
    expect(blogInDB).toHaveLength(listHelper.initialBlogs.length + 1);
  });

  test("http POST default like value: ", async () => {
    const newBlog = {
      title: "TestPost",
      author: "Test",
      url: "www.test.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect("Content-Type", /application\/json/);

    const blogInDB = await listHelper.blogInDB();
    expect(blogInDB[blogInDB.length - 1].likes).toBe(0);
  });

  test("http POST verify for title and url: ", async () => {
    const newBlog = {
      author: "Test",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("http DELETE request: ", async () => {
    const blogsAtStart = await listHelper.blogInDB();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await listHelper.blogInDB();

    expect(blogsAfterDeletion).toHaveLength(listHelper.initialBlogs.length - 1);

    const ids = blogsAfterDeletion.map((blog) => blog.id);

    expect(ids).not.toContain(blogToDelete.id);
  });

  test("http PUT request: ", async () => {
    const blogsAtStart = await listHelper.blogInDB();
    const blogToUpdate = blogsAtStart[0];

    const newLikes = 10000;
    blogToUpdate.likes = newLikes;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAfterUpdate = await listHelper.blogInDB();

    const likes = blogsAfterUpdate.map((blog) => blog.likes);

    expect(likes).toContain(newLikes);
  });
});

describe("total likes", () => {
  test("when list has no blog entries, equals the likes of that", () => {
    const emptyBlog = [];
    const result = listHelper.totalLikes(emptyBlog);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([].concat(blogs[0]));
    expect(result).toBe(7);
  });

  test("When list has more than one blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("favorite blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("most blogs with author Robert C. Martin", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with most likes", () => {
  test("most likes with the author Edsger W. Dijkstra", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
