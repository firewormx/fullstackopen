import "../app.css";
const Notification = ({ notification }) => {
  if (notification[0] === "") {
    return null;
  }
  const type = notification[1] ? "success" : "error";
  return (
    <div className={type} data-testid="error">
      {notification[0]}
    </div>
  );
};

export default Notification;
