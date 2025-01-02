import { useSocketContext } from "./socketContext";
import useConversation from "../zustand/useConversation";
import  { useEffect } from "react";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();
  
    useEffect(() => {
      socket.on("newMessage", (newMessage) => {
       
        setMessage([...messages, newMessage]);
      });
      return () => {
        socket.off("newMessage");
      };
    }, [socket, messages, setMessage]);
  };
  export default useGetSocketMessage;