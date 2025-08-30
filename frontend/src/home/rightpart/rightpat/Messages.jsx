import useGetMessage from "../../../context/useGetMessage";
import Message from "./Message";
import Loading from "../../../components/Loading";
import useGetSocketMessage from "../../../context/useGetSocketMessage";
function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  console.log(messages);

  return (
    <div
    className="flex-1 overflow-y-auto"
    style={{ minHeight: "calc(92vh - 8vh)" }}
  >
    {loading ? (
      <Loading />
    ) : (
      messages.length > 0 &&
      messages.map((message, index) => (
        <div key={message._id || index} >
          <Message message={message} />
        </div>
      ))
    )}

    {!loading && messages.length === 0 && (
      <div>
        <p className="text-center mt-[20%]">
          Say! Hi to start the conversation
        </p>
      </div>
    )}
  </div>
);
  
}

export default Messages;