import React from "react";

export default ({ list }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {list
      ? list.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))
      : "List empty"}
  </ul>
);
