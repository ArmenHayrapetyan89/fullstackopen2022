import { useState, useEffect } from "react";

import personsService from "./services/persons";

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
        filteredObject.map(
          (person) => (person.phoneNumber = props.phoneNumber)
        );

        const personObject = filteredObject.find((person) => person);
        const id = personObject.id;

        personsService.update(id, personObject).then((response) => {
          props.setPersons(
            props.persons.map((person) =>
              person.id !== id ? person : response.data
            )
          );
        });
      }
    } else {
      const personsObject = {
        name: props.newName,
        phoneNumber: props.phoneNumber,
      };

      personsService.create(personsObject).then((response) => {
        props.setPersons(props.persons.concat(response.data));
        props.setNewName("");
        props.setPhoneNumber("");
      });
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
              value={props.phoneNumber}
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
      personsService.deleteObject(id).then(() => {
        props.setPersons(props.persons.filter((person) => person.id !== id));
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
          {person.name} {person.phoneNumber}{" "}
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSearch, setShowSearch] = useState("");

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
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
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
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleSearchChange={handleSearchChange}
        handlePeronsChange={handlePeronsChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </div>
  );
};
export default App;
