const Notification = ({ message, alertStat }) => {
  if (message !== null)
    return (
      <div className={alertStat === "success" ? "success" : "error"}>
        {message}
      </div>
    );
};
export default Notification;
