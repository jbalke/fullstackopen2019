import React from "react";
import Part from "../components/part";

export default ({ parts }) => (
  <>
    {parts &&
      parts.map(({ name, exercises }, i) => (
        <Part name={name} exercises={exercises} key={i} />
      ))}
  </>
);
