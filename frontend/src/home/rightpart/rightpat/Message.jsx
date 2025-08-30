import PropTypes from "prop-types"

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  
  // Add safety checks for message and senderId
  if (!message || !message.senderId) {
    console.log("Message or senderId is undefined:", message);
    return null; // Don't render anything if message is invalid
  }
  
  // Handle both string ID and populated object
  const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
  
  // Convert both to strings for comparison to handle ObjectId vs string issues
  const senderIdString = String(senderId);
  const authUserIdString = String(authUser?.user?._id);
  const itsMe = senderIdString === authUserIdString;

  console.log("=== MESSAGE DEBUG ===");
  console.log("Message object:", message);
  console.log("Auth user:", authUser);
  console.log("SenderId (original):", message.senderId);
  console.log("SenderId (processed):", senderId);
  console.log("SenderId (string):", senderIdString);
  console.log("Auth user ID:", authUser?.user?._id);
  console.log("Auth user ID (string):", authUserIdString);
  console.log("Comparison result:", itsMe);
  console.log("=====================");

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



