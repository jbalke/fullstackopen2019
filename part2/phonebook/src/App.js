import React, { useEffect, useMemo, useRef, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

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

  const showNotification = ({ level = "info", message = "" }) => {
    setNotification({
      level,
      message
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPerson = e => {
    e.preventDefault();
    let existingPerson = persons.find(
      person =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
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
            setNotification({
              level: "success",
              message: `${existingPerson.name} has been updated!`
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch(error => {
            showNotification({
              level: "error",
              message: "This person has been removed from the server."
            });
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim()
      };
      phonebook.create(newPerson).then(persistedPerson => {
        const p = { ...newPerson, id: persistedPerson.id };
        setPersons([...persons, p]);
        showNotification({
          level: "success",
          message: `${newPerson.name} has been added!`
        });
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
          showNotification({
            level: "success",
            message: `${personToDelete.name} removed!`
          });
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification({
            level: "error",
            message: "This person had already been removed from the server."
          });
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
      <h1>Phonebook</h1>
      <Notification alert={notification} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameRef={nameInputEl}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons list={listToShow} deleteHandler={handlePersonDeletion} />
    </div>
  );
};

export default App;
