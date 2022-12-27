const Notification = (props) => {
  if (props.message === null) {
    return null;
  }

  return <div className={props.cssClass}>{props.message}</div>;
};

export default Notification;
