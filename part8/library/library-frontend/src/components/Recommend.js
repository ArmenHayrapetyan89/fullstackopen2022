import { useQuery } from "@apollo/client";
import { FILTER_BOOKS, GET_USER } from "./queries";

const Recommend = (props) => {
  const userQuery = useQuery(GET_USER, { pollInterval: 2000 });
  //const booksQuery = useQuery(ALL_BOOKS, { pollInterval: 2000 });
  const filterByGenre = useQuery(FILTER_BOOKS, {
    variables: { genre: userQuery.data?.me?.favouriteGenre },
  });

  if (userQuery.loading || filterByGenre.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  //const user = userQuery.data.me;
  //const books = [...booksQuery.data.allBooks];

  /*const filteredFavouriteBooks = books.filter((book) => {
    return book.genres.includes(user.favouriteGenre);
  });*/

  console.log("FILTER BY GENRE: ", filterByGenre.data.allBooks);

  const books = [...filterByGenre.data.allBooks];

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <strong>{userQuery.data?.me?.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
          {/*filteredFavouriteBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))*/}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
