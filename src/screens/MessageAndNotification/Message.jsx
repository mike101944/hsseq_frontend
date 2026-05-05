import React, { useState } from "react";
import { Avatar, TextField, IconButton, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const contacts = [
  { id: 1, name: "Emily Bruce", avatar: "/static/images/avatar/1.jpg", lastMessage: "Hi, I need help with..." },
  { id: 2, name: "James Rowling", avatar: "/static/images/avatar/2.jpg", lastMessage: "I'll check the files..." },
  { id: 3, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 4, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 5, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 6, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 7, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 8, name: "Emily Bruce", avatar: "/static/images/avatar/1.jpg", lastMessage: "Hi, I need help with..." },
  { id: 9, name: "James Rowling", avatar: "/static/images/avatar/2.jpg", lastMessage: "I'll check the files..." },
  { id: 10, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 11, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 12, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 13, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
  { id: 14, name: "George Orwell", avatar: "/static/images/avatar/3.jpg", lastMessage: "Let's meet at 3 PM" },
];

const messages = [
  { sender: "Emily Bruce", text: "Hi, I need help with my project.", time: "10:25 AM", self: false },
  { sender: "You", text: "Of course! What's the issue?", time: "10:27 AM", self: true },
  { sender: "Emily Bruce", text: "I'm struggling with the layout.", time: "10:30 AM", self: false },
  { sender: "You", text: "Try adjusting padding & margins.", time: "10:32 AM", self: true },
];

export function Message() {
  const [selectedChat, setSelectedChat] = useState(contacts[0]);
  const [chatMessages, setChatMessages] = useState(messages);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { sender: "You", text: message, time: "Now", self: true }]);
    setMessage("");
  };

  return (
    <div className="flex gap-5">
   

      {/* Chat List */}
      <div className="w-80 border-r bg-white overflow-y-auto max-h-[360px]">

        <div className=" space-y-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center rounded px-2 gap-2 cursor-pointer ${selectedChat.id === contact.id ? "bg-gray-200" : ""}`}
              onClick={() => setSelectedChat(contact)}
            >
              <Avatar src={contact.avatar} className="font-"/>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Chat Window */}
      <div className=" flex flex-col w-full">

        <div className="px-4 py-2 bg-white border-b flex items-center">
          <Avatar src={selectedChat.avatar} className="" />
          <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
        </div>

        <div className="flex flex-col max-h-[270px] p-2 overflow-y-auto bg-gray-50">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.self ? "justify-end" : "justify-start"} mb-2`}>
              <div className={`p-3 rounded-lg max-w-xs ${msg.self ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {msg.text}
                <span className="block text-xs mt-1 text-gray-500">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>


        {/* Message Input */}
        <div className="p-2 bg-white border-t flex items-center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <IconButton color="primary" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </div>


      </div>
    </div>
  );
}
