//import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //dispatch(createAnecdote(content));
    props.createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;

//export default AnecdoteForm;
