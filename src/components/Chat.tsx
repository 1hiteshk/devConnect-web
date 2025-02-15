import React, { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const Chat = (props: Props) => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<any>([{text:'hello'}]);
  return (
    <div className="w-1/2 mx-auto h-[70vh] m-5 flex flex-col border border-gray-600">
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
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
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
        />
        <button className="btn btn-secondary">send</button>
      </div>
    </div>
  );
};

export default Chat;
