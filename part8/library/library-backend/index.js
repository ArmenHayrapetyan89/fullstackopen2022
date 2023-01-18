const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
  }

  type Query {
    allBooks(genre: String): [Books!]!
  }

  type Query {
    allAuthors(author: String): [Authors]
  }

  type Mutation {
    addBook(
      title: String
      author: String
      published: String
      genres: [String]
    ): Books
  }

  type Mutation {
    editAuthor(name: String, setBornTo: String): [Authors]
  }

  type Books {
    title: String
    author: String
    published: String
    genres: [String]
  }

  type Authors {
    name: String
    born: String
    bookCount: Int
    title: String
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return books;
      //return books.filter((book) => book.genres.includes(args.genre));
    },
    allAuthors: () => {
      let countedBooks = books.reduce((accumulator, book) => {
        accumulator[book.author] = (accumulator[book.author] || 0) + 1;
        return accumulator;
      }, {});

      return authors.map((author) => ({
        ...author,
        bookCount: countedBooks[author.name] || 0,
      }));

      /*return books.filter(
        (book) =>
          book.author.toLocaleLowerCase() === args.author.toLocaleLowerCase()
      );*/
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);

      const author = authors.filter((author) => author.name === newBook.author);

      if (author.length === 0) {
        authors.concat({ name: newBook.author, id: uuid() });
      }

      return newBook;
    },

    editAuthor: (root, args) => {
      const filteredAuthors = authors.filter(
        (author) => author.name.toLowerCase() === args.name.toLowerCase()
      );

      if (filteredAuthors.length === 0) {
        return null;
      }

      authors = authors.map((author) =>
        author.name.toLowerCase() === args.name.toLowerCase()
          ? { ...author, born: args.setBornTo }
          : author
      );

      return authors;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
