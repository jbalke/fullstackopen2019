import React from "react";

export default ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts ? parts.reduce((acc, v) => acc + v.exercises, 0) : 0}
  </p>
);
