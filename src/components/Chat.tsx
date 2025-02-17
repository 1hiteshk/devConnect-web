import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../config/socket";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constant";


type Props = {};

const Chat = (props: Props) => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store: any) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      console.log(msg,'msg');
      const { senderId, text,createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        timeStamp: createdAt,
        photoUrl: senderId.photoUrl
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, timeStamp }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text, timeStamp }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,

    });
    setNewMessage("");
  };

  return (
    <div className="w-[90%] md:w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5" style={{scrollbarWidth:'none'}}>
        {messages.map((msg, index) => {
          const time = new Date(msg?.timeStamp).toLocaleString("en-US", { timeZone: "Asia/Kolkata"  })
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={user.firstName === msg.firstName ? user.photoUrl : msg.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="pl-2 text-xs opacity-50">{time}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="bg-[#f263c8] h-10 px-2 rounded-md text-black md:px-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

// websockets are only for real time communication
// to fetch previous messages we need to call an api
// we will just fetch the chats and show it to the user on the initial page load
