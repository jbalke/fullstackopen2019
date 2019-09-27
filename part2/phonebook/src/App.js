import React, { useMemo, useRef, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const nameInputEl = useRef(null);

  const addPerson = e => {
    e.preventDefault();
    if (
      persons.some(
        person =>
          person.name.trim().toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
      nameInputEl.current.focus();
    }
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  // useMemo not necessary in this case but wanted to avoid filtering on each render
  const listToShow = useMemo(
    () =>
      filter
        ? persons.filter(person =>
            person.name.toLowerCase().includes(filter.trim().toLowerCase())
          )
        : persons,
    [persons, filter]
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameRef={nameInputEl}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons list={listToShow} />
    </div>
  );
};

export default App;
