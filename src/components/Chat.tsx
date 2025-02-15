import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../config/socket";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

type Props = {};

const Chat = (props: Props) => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [newMessages, setNewMessages] = useState("")
  const user = useSelector((store:any)=> store.user);
  const userId = user?._id;

  // as soon as the page loads we would like to connect to the ws servers
  // whenever you are making a socket connection make sure you are disconnecting also
  useEffect(() => {
    if(!userId) return;
    const socket = createSocketConnection();
    // a soon as the page loaded , the socket connection is made and joinChat event is emitted
    socket.emit('joinChat',{firstName: user.firstName,userId,targetUserId}); // as soon as we emit this event our backend will receive an event to join

    // whenever we receive a new message we will update the state of messages
    socket.on('messageReceived', ({firstName,text})=>{
      console.log(firstName, " : ", text);
      setMessages((messages)=>[...messages, {firstName,text}]);
    })
  // clean up socket connections for performance reasons
    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId])

  const sendMessage = ()=>{
    const socket = createSocketConnection();
    console.log('send message chala');
    // now we can send the message from here, who is sending msg to whom from here  , 
    socket.emit('sendMessage',{
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessages
    })
    // once we send the message from here we can listen them on backend socket event 'sendMessage' , after that backend has to make sure that further we are sending
    // back the message to the targetUserId (to a particular room) 

    setNewMessages('');
  }
  
  return (
    <div className="w-3/4 mx-auto h-[70vh] m-5 flex flex-col border border-gray-600">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      {/* display messages */}
      <div
        className="flex-1 overflow-scroll p-5"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((message, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {message.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className="flex-1 border border-gray-500 text-white rounded p-2"
          placeholder="message..."
          type="text"
          value={newMessages}
          onChange={(e)=>setNewMessages(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-secondary">send</button>
      </div>
    </div>
  );
};

export default Chat;
