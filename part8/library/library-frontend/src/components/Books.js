import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, FILTER_BOOKS } from "./queries";

const Books = (props) => {
  const booksQuery = useQuery(ALL_BOOKS, { pollInterval: 2000 });
  //const [filterGenre, setFilterGenre] = useState([]);
  const [filterGenre, setFilterGenre] = useState("");
  const filterByGenre = useQuery(FILTER_BOOKS, {
    variables: { genre: filterGenre },
  });

  if (booksQuery.loading || filterByGenre.loading) {
    return <div>loading...</div>;
  }

  const books = [...booksQuery.data.allBooks];

  const genres = books.flatMap((book) => book.genres);

  if (!props.show) {
    return null;
  }

  //console.log("FILTERBY GENRE: ", );

  const handleFilterGenre = (genre) => {
    setFilterGenre(genre);
    filterByGenre.refetch({ genre });
  };
  /*const filterGenreOnClick = (genre) => {
    if (genre.toLowerCase() === "all") {
      setFilterGenre(books);
    } else {
      const filteredGenre = books.filter((book) => {
        return book.genres.includes(genre);
      });
      setFilterGenre(filteredGenre);
    }
  };*/

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterByGenre.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
          {/*filterGenre.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))*/}
        </tbody>
      </table>
      <div>
        {genres.map((genre, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => handleFilterGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div>
        <button type="button" onClick={() => handleFilterGenre("all")}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
