import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage=async(req,res)=>{
    try{
   const {message}=req.body;
   const{id: receiverId} = req.params;
   const senderId=req.user._id;
    let conversation=await Conversation.findOne({
        members:{$all:[senderId, receiverId]},
    });
    if(!conversation){
        conversation=await Conversation.create({
            members:[senderId, receiverId],
        })
    };
        const newmessage=new Message({
            senderId,
            receiverId,
            message,
        });
    if(newmessage){
        conversation.messages.push(newmessage._id);
    }
    await Promise.all([conversation.save(), newmessage.save()]); // run parallel
    
    // Populate the senderId before sending
    const populatedMessage = await Message.findById(newmessage._id).populate('senderId', 'fullname');
    
    console.log("=== BACKEND DEBUG ===");
    console.log("Original senderId:", senderId);
    console.log("Populated message:", populatedMessage);
    console.log("Populated senderId:", populatedMessage.senderId);
    console.log("=====================");
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }
    res.status(201).json({message:"Message sent successfully",
        newmessage: populatedMessage,
    });
} catch (error) {
  console.log("Error in sendMessage", error);
  res.status(500).json({ error: "Internal server error" });
}
};

export const getMessage = async (req, res) => {
    try {
      const { id: chatUser } = req.params;
      const senderId = req.user._id; // current logged in user
      
      console.log("=== GET MESSAGE DEBUG ===");
      console.log("ChatUser ID:", chatUser);
      console.log("Sender ID:", senderId);
      console.log("User object:", req.user);
      
      let conversation = await Conversation.findOne({
        members: { $all: [senderId, chatUser] },
      }).populate({
        path: "messages",
        populate: {
          path: "senderId",
          select: "fullname"
        }
      });
      
      console.log("Found conversation:", conversation);
      
      if (!conversation) {
        console.log("No conversation found, returning empty array");
        return res.status(200).json([]);
      }
      
      const messages = conversation.messages;
      console.log("Messages:", messages);
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessage:", error);
      console.log("Error stack:", error.stack);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };