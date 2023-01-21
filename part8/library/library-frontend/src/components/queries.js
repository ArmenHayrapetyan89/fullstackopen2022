import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($name: String, $setBornTo: String) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      username
      id
      favouriteGenre
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`;

export const FILTER_BOOKS = gql`
  query filterByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`;
