import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdoteToUpdate = state.find(
        (anecdote) => anecdote.id === action.payload
      );

      const votes = anecdoteToUpdate.votes + 1;
      const anecdoteUpdatedVote = { ...anecdoteToUpdate, votes };

      return state.map((anecdote) =>
        anecdote.id === anecdoteUpdatedVote.id ? anecdoteUpdatedVote : anecdote
      );
    },
    createAnecdote: (state, action) => {
      return [...state, { content: action.payload, id: getId(), votes: 0 }];
    },
  },
});
/*
export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const anecdoteToUpdate = state.find(
        (anecdote) => anecdote.id === action.id
      );

      const votes = anecdoteToUpdate.votes + 1;
      const anecdoteUpdatedVote = { ...anecdoteToUpdate, votes };

      return state.map((anecdote) =>
        anecdote.id === anecdoteUpdatedVote.id ? anecdoteUpdatedVote : anecdote
      );

    case "NEW_ANECDOTE":
      return [...state, action.data];

    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};*/

export default anecdoteSlice.reducer;
export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions;
