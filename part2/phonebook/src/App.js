import { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSearch, setShowSearch] = useState("");

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

/*
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const addPersons = (event) => {
    event.preventDefault();
    const personsObject = {
      name: newName,
      phoneNumber: phoneNumber,
    };

    const filteredName = persons.filter((person) => person.name === newName);

    if (filteredName.length > 0) {
      const errorMessage = `${newName} is already added to phonebook`;
      setNewName("");
      return alert(errorMessage);
    }

    setPersons(persons.concat(personsObject));
    setNewName("");
  };

  const handlePeronsChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setShowSearch(event.target.value);
  };

  const searchPersons = () => {
    return persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(showSearch.toLocaleLowerCase())
    );
  };

  const searchToShow = showSearch === "" ? persons : searchPersons();

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with{" "}
        <input value={showSearch} onChange={handleSearchChange} />
      </p>
      <form onSubmit={addPersons}>
        <div>
          <p>
            name: <input value={newName} onChange={handlePeronsChange} />
          </p>
          <p>
            number:{" "}
            <input value={phoneNumber} onChange={handlePhoneNumberChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {searchToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};
*/
export default App;
