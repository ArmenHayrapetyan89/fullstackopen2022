import { useState, useEffect } from "react";
import axios from "axios";

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
    const personsObject = {
      name: props.newName,
      phoneNumber: props.phoneNumber,
    };

    const filteredName = props.persons.filter(
      (person) => person.name === props.newName
    );

    if (filteredName.length > 0) {
      const errorMessage = `${props.newName} is already added to phonebook`;
      return alert(errorMessage);
    }

    props.setPersons(props.persons.concat(personsObject));
    props.setNewName("");
    props.setPhoneNumber("");
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
        <p key={person.name}>
          {person.name} {person.phoneNumber}
        </p>
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
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
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
