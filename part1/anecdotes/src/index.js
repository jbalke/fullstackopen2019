import React, { useState } from "react";
import ReactDOM from "react-dom";

function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Anecdote = ({ heading, anecdote, votes }) => (
  <>
    <h2>{heading}</h2>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const handleVoteClick = () => {
    var votesUpdate = [...votes];
    var voteIdx = 0;

    votesUpdate[selected] += 1;
    setVotes(votesUpdate);

    // find the idex of the highest vote
    votesUpdate.reduce((acc, val, idx) => {
      if (val > acc) {
        voteIdx = idx;
        return val;
      }
      return acc;
    });
    setMostVotes(voteIdx);
  };

  const handleNextClick = () => {
    var nextAnecdote;
    // ensure that we don't repeat the same value twice in a row
    do {
      nextAnecdote = RandomNumber(0, props.anecdotes.length - 1);
    } while (nextAnecdote === selected);
    setSelected(nextAnecdote);
  };

  return (
    <>
      <Anecdote
        heading="Anecdote of the day"
        anecdote={props.anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <Anecdote
        heading="Anecdote with most votes"
        anecdote={props.anecdotes[mostVotes]}
        votes={votes[mostVotes]}
      />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
