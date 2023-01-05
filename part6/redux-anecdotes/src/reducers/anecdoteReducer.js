import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
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
    appendAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdotesVote = await anecdoteService.updateVotes(anecdote);
    dispatch(voteAnecdote(updatedAnecdotesVote.id));
  };
};

export default anecdoteSlice.reducer;
export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
