import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("Blogs: ", () => {
  const blog = {
    title: "Test5",
    author: "test5",
    url: "www.test5.com",
    likes: 28,
    id: "63aece36804b29ad5c820f59",
  };

  test("renders title and author as default: ", () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector(".title-author");

    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);
  });

  test("blog url and number of likes are shown when button is clicked: ", async () => {
    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const buttonView = screen.getByText("view");

    await user.click(buttonView);

    const div = container.querySelector(".full-blog");
    expect(div).not.toHaveStyle("display: none;");
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);
  });

  test("like button is clicked twice: ", async () => {
    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("like");

    const elementBefore = container.querySelector(".likesContent");
    const elementInt1 = parseInt(elementBefore.textContent);

    await user.dblClick(button);

    const elementAfter = container.querySelector(".likesContent");
    const elementInt2 = parseInt(elementAfter.textContent);

    const result = elementInt2 - elementInt1;

    expect(result).toBe(2);
  });
});

describe("Blogform: ", () => {
  test("create new blog: ", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);
    const newBlogButton = container.querySelector(".create-blog-button");

    const inputTitle = container.querySelector(".title-field");
    const inputAuthor = container.querySelector(".author-field");
    const inputUrl = container.querySelector(".url-field");

    await user.type(inputTitle, "Title Blog");
    await user.type(inputAuthor, "Homer Simpson");
    await user.type(inputUrl, "www.testblog.com");

    await user.click(newBlogButton);

    expect(createBlog).toHaveBeenCalledWith({
      title: "Title Blog",
      author: "Homer Simpson",
      url: "www.testblog.com",
    });
    
  });
});
