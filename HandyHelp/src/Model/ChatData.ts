interface Message {
  messageId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface LastMessage {
  senderId: string;
  text: string;
  timestamp: string;
}

interface ChatHead{
  user1Id:string;
  user2Id:string;
  postId:string;
  postPicture:string;
  postTitle:string;
  chatId:string;
  users:string[];
}

interface ChatData {
  chatId: string;
  chatHead: ChatHead;
  lastMessage: LastMessage;
  messages: Message[];
}
  
 
  export default ChatData;
  