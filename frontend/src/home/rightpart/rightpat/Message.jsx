import PropTypes from "prop-types"

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;
console.log(message.senderId);
  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}
Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,  // Accept both string or object
};
export default Message;



