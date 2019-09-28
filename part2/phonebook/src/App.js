import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const SERVER_URL = "http://localhost:3001";

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/persons`)
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
      axios.post(`${SERVER_URL}/persons`, newPerson).then(response => {
        console.log(response);
        const savedPerson = { ...newPerson, id: response.data.id };
        setPersons([...persons, savedPerson]);
        setNewName("");
        setNewNumber("");
        nameInputEl.current.focus();
      });
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
