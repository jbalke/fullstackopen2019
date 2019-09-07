import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <main>
      <section>
        <h2>give feedback</h2>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </section>
      <section>
        <h2>statistics</h2>
        <div>
          <p>good: {good}</p>
          <p>neutral: {neutral}</p>
          <p>bad: {bad}</p>
        </div>
      </section>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
