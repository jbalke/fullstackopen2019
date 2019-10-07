import React from "react";

const PersonForm = ({
  onSubmit,
  nameRef,
  name,
  handleNameChange,
  number,
  handleNumberChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input ref={nameRef} value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
