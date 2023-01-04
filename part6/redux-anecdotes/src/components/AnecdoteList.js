import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filters = useSelector((state) => state.filters);

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content
      .toLowerCase()
      .includes(filters.filter.toLowerCase());
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    //dispatch({ type: "VOTE", id: anecdote.id });
    dispatch(voteAnecdote(anecdote.id));

    dispatch(setNotification(`you voted '${anecdote.content}'`));

    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const sortedAnecdotes = (anecdotes) => {
    return [...anecdotes].sort(
      (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
    );
  };

  return (
    <div>
      {sortedAnecdotes(filteredAnecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
