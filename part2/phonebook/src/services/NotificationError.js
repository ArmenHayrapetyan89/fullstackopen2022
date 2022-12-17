const Notification = (props) => {
  if (props.message === "") {
    return "";
  }

  return (
    <div>
      <div className="unsuccessful">{props.message}</div>
    </div>
  );
};

export default Notification;
