import React from "react";

const Persons = ({ list, deleteHandler }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {list
      ? list.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={deleteHandler(person.id)}>delete</button>
          </li>
        ))
      : "List empty"}
  </ul>
);

export default Persons;
