const { UserInputError } = require("apollo-server");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

const JWT_SECRET = "password";

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },
    authorCount: async () => {
      return await Author.countDocuments();
    },
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0 || args.genre === "all") {
        return await Book.find({}).populate("author");
      }
      return await Book.find({ genres: { $in: [args.genre] } }).populate(
        "author"
      );
    },
    allAuthors: async () => {
      return await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$books" },
            id: "$_id",
          },
        },
      ]);
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== JWT_SECRET) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      if (context.currentUser !== undefined) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new UserInputError(`Author ${args.author} not found!`);
        }

        const book = new Book({
          ...args,
          author: author._id,
        });

        try {
          await book.save();

          console.log("BOOK: ", book);

          pubSub.publish("BOOK_ADDED", {
            bookAdded: await Book.findById(book._id).populate("author"),
          });
          return Book.findById(book._id).populate("author");
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      throw new UserInputError("User does not exist!");
    },

    editAuthor: async (root, args, context) => {
      if (context.currentUser !== undefined) {
        const author = await Author.findOne({ name: args.name });

        if (!author) {
          throw new UserInputError(`Author ${args.name} not found!`);
        }

        const updatedAuthor = await Author.findByIdAndUpdate(
          author.id,
          {
            $set: { born: args.setBornTo },
          },
          { new: true }
        );

        return updatedAuthor;
      }
      throw new UserInputError("User does not exist!");
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
