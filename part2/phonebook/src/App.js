import React, { useEffect, useMemo, useRef, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const nameInputEl = useRef(null);

  const clearForm = () => {
    setNewNumber("");
    setNewName("");
    nameInputEl.current.focus();
  };

  const addPerson = e => {
    e.preventDefault();
    let existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existingPerson) {
      let updatePerson = window.confirm(
        `${existingPerson.name} is already in the phonebook, replace the old number with the new one?`
      );
      if (updatePerson) {
        phonebook
          .update(existingPerson.id, {
            name: existingPerson.name,
            number: newNumber
          })
          .then(() => {
            let updatedPersons = persons.map(person =>
              person.id === existingPerson.id
                ? { ...existingPerson, number: newNumber }
                : person
            );
            setPersons(updatedPersons);
            clearForm();
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      phonebook.create(newPerson).then(persistedPerson => {
        const p = { ...newPerson, id: persistedPerson.id };
        setPersons([...persons, p]);
        clearForm();
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

  const handlePersonDeletion = id => () => {
    let personToDelete = persons.find(p => p.id === id);
    let deletePerson = window.confirm(`Delete ${personToDelete.name}?`);
    if (deletePerson) {
      phonebook
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert(`Entry #${id} does not exist.`);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
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
      <Persons list={listToShow} deleteHandler={handlePersonDeletion} />
    </div>
  );
};

export default App;
