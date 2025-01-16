"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";

const Chatroom = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [trip,setTrip]= useState(null);

  const { tripId } = useParams();



  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setUsername(user.username || user.fullName);
    }
  }, [isLoaded, isSignedIn, user]);

    useEffect(() => {
  
      if (!isLoaded || !isSignedIn) return;
  
      async function fetchTrip() {
        try {
          const response = await fetch(`/api/get-trip-info?id=${tripId}`);
          if (!response.ok) throw new Error("Failed to fetch trip details.");
  
          const data = await response.json();
          setTrip(data.trip);
        } catch (error) {
          console.error("Error fetching trip details:", error);
        }
      }
  
  
      fetchTrip();
    }, [tripId, user, isLoaded, isSignedIn]);

  useEffect(() => {
    const messagesRef = ref(db, `chatrooms/${tripId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, [tripId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "" && tripId) {
      const messagesRef = ref(db,`chatrooms/${tripId}/messages`);
      push(messagesRef, {
        username,
        message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  if (!isLoaded || !trip) {
    return <Loading />;
  }

  console.log("tie",trip);


  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Chatroom for trip title= {trip.title}</h2>
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
          disabled
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
