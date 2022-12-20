import { useState, useEffect } from "react";

import personsService from "./services/persons";
import NotificationSuccessful from "./services/NotificationSuccessful";
import NotificationError from "./services/NotificationError";

const Filter = (props) => {
  return (
    <div>
      <p>
        filter shown with{" "}
        <input value={props.showSearch} onChange={props.handleSearchChange} />
      </p>
    </div>
  );
};

const PersonForm = (props) => {
  const addPersons = (event) => {
    event.preventDefault();

    const filteredObject = props.persons.filter(
      (person) => person.name === props.newName
    );

    if (filteredObject.length > 0) {
      const errorMessage = `${props.newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(`${errorMessage}`)) {
        filteredObject.map((person) => (person.number = props.number));

        const personObject = filteredObject.find((person) => person);
        const id = personObject.id;

        personsService.update(id, personObject).then((response) => {
          props.setPersons(
            props.persons.map((person) =>
              person.id !== id ? person : personObject
            )
          );
        });
      }
    } else {
      const personsObject = {
        name: props.newName,
        number: props.number,
      };

      personsService
        .create(personsObject)
        .then((response) => {
          props.setPersons(props.persons.concat(response.data));

          props.setNewName("");
          props.setNumber("");

          props.setSuccessMessage(`Added ${personsObject.name}`);
          setTimeout(() => {
            props.setSuccessMessage("");
          }, 4000);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <form onSubmit={addPersons}>
        <div>
          <p>
            name:{" "}
            <input value={props.newName} onChange={props.handlePeronsChange} />
          </p>
          <p>
            number:{" "}
            <input
              value={props.number}
              onChange={props.handlePhoneNumberChange}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  const deletePerson = (id) => {
    const personArray = props.persons.filter((person) => person.id === id);

    const personName = personArray.map((person) => person.name);

    if (window.confirm(`Delete ${personName} ?`)) {
      personsService
        .deleteObject(id)
        .then(() => {
          props.setPersons(props.persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          props.setUnsuccessfulMessage(
            `Information of ${personName} has already been removed from server`
          );
          setTimeout(() => {
            props.setUnsuccessfulMessage("");
          }, 4000);
        });
    }
  };

  const searchPersons = () => {
    return props.persons.filter((person) =>
      person.name
        .toLocaleLowerCase()
        .includes(props.showSearch.toLocaleLowerCase())
    );
  };

  const searchToShow =
    props.showSearch === "" ? props.persons : searchPersons();

  return (
    <div>
      {searchToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button type="button" onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [unsuccessfullMessage, setUnsuccessfulMessage] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setShowSearch(event.target.value);
  };

  const handlePeronsChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccessful message={successMessage} />
      <NotificationError message={unsuccessfullMessage} />
      <Filter
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleSearchChange={handleSearchChange}
        handlePeronsChange={handlePeronsChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleSearchChange={handleSearchChange}
        handlePeronsChange={handlePeronsChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        unsuccessfullMessage={unsuccessfullMessage}
        setUnsuccessfulMessage={setUnsuccessfulMessage}
      />
    </div>
  );
};
export default App;
