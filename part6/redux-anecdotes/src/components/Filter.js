//import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  //const dispatch = useDispatch();

  const handleChange = (event) => {
    //dispatch(filterAnecdote(event.target.value));
    props.filterAnecdote(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAnecdote,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;
//export default Filter;
