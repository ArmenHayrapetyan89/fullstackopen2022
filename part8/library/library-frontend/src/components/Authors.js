import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "./queries";

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const authorsQuery = useQuery(ALL_AUTHORS, { pollInterval: 2000 });
  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>;
  }

  const authors = [...authorsQuery.data.allAuthors];

  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const submitUpdatedBirthyear = async (event) => {
    event.preventDefault();

    updateBirthyear({
      variables: { name: selectedAuthor.value, setBornTo: birthyear },
    });

    setSelectedAuthor(null);
    setBirthyear("");
  };

  const handleChange = (selectedOption) => {
    setSelectedAuthor(selectedOption);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submitUpdatedBirthyear}>
        <div className="authors-class">
          <Select
            options={options}
            onChange={handleChange}
            value={selectedAuthor}
          />
        </div>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button>updateAuthor</button>
      </form>
    </div>
  );
};

export default Authors;
