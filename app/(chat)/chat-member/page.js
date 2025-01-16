"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import Loading from "@/app/loading";

export default function IndividualMessagePage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const receiverName = searchParams.get("fullName");

  const { user, isSignedIn, isLoaded } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    if (!receiverId) return;

    const chatId =
      senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
    const messagesRef = ref(db, `directMessages/${chatId}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, [user?.id, receiverId]); 
  
  if (!isLoaded || !isSignedIn) {
    return <Loading />;
  }

  const senderId = user.id;

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const chatId =
      senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
    const messagesRef = ref(db, `directMessages/${chatId}`);

    push(messagesRef, {
      senderId,
      receiverId,
      message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">
        Direct Message: {user.fullName} → {receiverName || "Receiver"}
      </h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "1rem",
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.senderId === senderId ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <strong>
                {msg.senderId === senderId ? "You" : receiverName || "Receiver"}:
              </strong>{" "}
              {msg.message}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet.</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="border px-2 py-1 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
