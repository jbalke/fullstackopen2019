import React from "react";

export default ({ parts }) => {
  const total = parts ? parts.reduce((acc, v) => acc + v.exercises, 0) : 0;
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};
