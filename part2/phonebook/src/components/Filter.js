import React from "react";

const Filter = ({ value, onChange }) => (
  <>
    filter shown with <input value={value} onChange={onChange} />{" "}
  </>
);

export default Filter;
