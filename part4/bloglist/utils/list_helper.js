const Blog = require("../models/blog");

const initialBlogs = [
  { title: "Test1", author: "Test1", url: "http://test1blog.org", likes: 30 },
  { title: "Test2", author: "Test2", url: "http://test2blog.org", likes: 20 },
  { title: "Test3", author: "Test3", url: "http://test3blog.org", likes: 10 },
];

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((previousValue, currentValue) => {
    return previousValue.likes > currentValue.likes
      ? previousValue
      : currentValue;
  });
};

const mostBlogs = (blogs) => {
  const countBlogsObjects = blogs.reduce(
    (previousValue, currentValue) => (
      (previousValue[currentValue.author] =
        ++previousValue[currentValue.author] || 1),
      previousValue
    ),
    {}
  );

  const authorWithMaxBlogs = Object.keys(countBlogsObjects).reduce(
    (previousValue, currentValue) =>
      countBlogsObjects[previousValue] > countBlogsObjects[currentValue]
        ? { author: previousValue, blogs: countBlogsObjects[previousValue] }
        : { author: currentValue, blogs: countBlogsObjects[currentValue] }
  );

  return authorWithMaxBlogs;
};

const mostLikes = (blogs) => {
  const authorObjectsLikes = blogs.reduce((accumulator, currentValue) => {
    accumulator[currentValue.author] =
      (accumulator[currentValue.author] || 0) + currentValue.likes;
    return accumulator;
  }, {});

  const maxValue = Math.max(...Object.values(authorObjectsLikes));
  const maxAuthor = Object.keys(authorObjectsLikes).find(
    (key) => authorObjectsLikes[key] === maxValue
  );

  authorWithMaxLikesObject = { author: maxAuthor, likes: maxValue };
  return authorWithMaxLikesObject;
};

const blogInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogInDB,
  initialBlogs,
};
