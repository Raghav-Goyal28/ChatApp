import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation";
import  { useEffect } from "react";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();
  
    useEffect(() => {
      if (!socket) return;
      
      socket.on("newMessage", (newMessage) => {
        console.log("Received socket message:", newMessage);
        if (newMessage && newMessage._id) {
          setMessage([...messages, newMessage]);
        }
      });
      return () => {
        socket.off("newMessage");
      };
    }, [socket, messages, setMessage]);
  };
  export default useGetSocketMessage;