import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;
  const average = () => (good - bad) / total();
  const positive = () => (good / total()) * 100;

  if (total() > 0)
    return (
      <section>
        <h2>statistics</h2>
        <table>
          <tbody>
            <Statistic text={"good"} value={good} />
            <Statistic text={"neutral"} value={neutral} />
            <Statistic text={"bad"} value={bad} />
            <Statistic text={"all"} value={total()} />
            <Statistic text={"average"} value={average()} />
            <Statistic text={"positive"} value={positive() + "%"} />
          </tbody>
        </table>
      </section>
    );

  return (
    <section>
      <h2>statistics</h2>
      <p>No feedback given.</p>
    </section>
  );
};

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
        <Button onClick={handleGoodClick} label={"good"} />
        <Button onClick={handleNeutralClick} label={"neutral"} />
        <Button onClick={handleBadClick} label={"bad"} />
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
