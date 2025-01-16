"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IndividualMessagePage() {

  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const receiverName = searchParams.get("fullName");
  const tripId= searchParams.get("tripId");

  const { user, isSignedIn, isLoaded } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!receiverId) return;

    const chatId =
      user.id < receiverId ? `${user.id}_${receiverId}` : `${receiverId}_${user.id}`;
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
    <div className="p-6">
      <Link href={`/chatroom/${tripId}`}>
      <Button variant="outline">Back to chatroom for trip {tripId}</Button></Link>
      <h2 className="text-xl font-semibold mb-6">
        Direct Message: {user.fullName} → {receiverName || "Receiver"}
      </h2>
      <div className="border border-gray-300 p-4 h-72 overflow-y-scroll rounded-md mb-6">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.senderId === senderId ? "text-right" : "text-left"
              }`}
            >
              <span className="font-bold">
                {msg.senderId === senderId ? "You" : receiverName || "Receiver"}:
              </span>{" "}
              {msg.message}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet.</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
