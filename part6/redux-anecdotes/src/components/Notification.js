//import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = (props) => {
  //const message = useSelector((state) => state.notifications.message);

  const message = props.message;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

const messageStateProps = (state) => {
  return {
    message: state.notifications.message,
  };
};
const ConnectedNotification = connect(messageStateProps)(Notification);

export default ConnectedNotification;
