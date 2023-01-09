import { useSelector } from "react-redux";

const Notification = (props) => {
  const message = useSelector((state) => state.notifications.message);

  if (message === null) {
    return null;
  }

  return <div className={props.cssClass}>{message}</div>;
};

export default Notification;
