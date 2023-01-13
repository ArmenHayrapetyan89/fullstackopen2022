import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      return [...state, action.payload];
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    deleteBlogs: (state, action) => {
      const blogToDelete = state.find((blog) => {
        return blog.id === action.payload.id;
      });

      return [...state].filter((blog) => blog.id !== blogToDelete.id);
    },
    likeBlogs: (state, action) => {
      const blogToUpdate = state.find((blog) => {
        return blog.id === action.payload.id;
      });

      return [...state].map((blog) =>
        blog.id === blogToUpdate.id
          ? { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
          : blog
      );
    },
    commentBlogs: (state, action) => {
      const [blog, comment] = action.payload;

      const blogToUpdate = state.find((actualBlog) => {
        return actualBlog.id === blog.id;
      });

      return [...state].map((actualBlog) =>
        actualBlog.id === blogToUpdate.id
          ? {
              ...blogToUpdate,
              comments: [...blogToUpdate.comments].concat(comment),
            }
          : actualBlog
      );
    },
  },
});

export const initializeBlogPosts = () => {
  return async (dispatch) => {
    const blogPosts = await blogService.getAll();
    dispatch(setBlogs(blogPosts));
  };
};

export const createBlog = (title, author, url, comments) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(title, author, url, comments);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteObject(blog.id);
    dispatch(deleteBlogs(blog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog);
    dispatch(likeBlogs(blog));
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.commentUpdate(blog.id, comment);
    dispatch(commentBlogs([blog, comment]));
  };
};
export default blogSlice.reducer;

const { setBlogs, appendBlog, deleteBlogs, likeBlogs, commentBlogs } =
  blogSlice.actions;
