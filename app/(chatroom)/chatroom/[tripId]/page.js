"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { useParams } from "next/navigation";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    // Fetch messages in real-time
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messagesRef = ref(db, "messages");
      push(messagesRef, {
        username,
        message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  const {tripId}= useParams();
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Chatroom for {tripId}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;
