const Notification = (props) => {
  if (props.message === "") {
    return "";
  }

  return (
    <div>
      <div className="success">{props.message}</div>
    </div>
  );
};

export default Notification;
