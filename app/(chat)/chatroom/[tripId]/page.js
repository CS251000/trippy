"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import AllUsers from "./AllUsers";
import { SendHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Chatroom = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [trip, setTrip] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

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

  useEffect(() => {
    
    async function fetchAllUsers() {
      try {
        const response = await fetch(`/api/get-trip-members?tripId=${tripId}`);
        if (!response.ok) throw new Error("Failed to fetch users.");

        const data = await response.json();
        setAllUsers(data.members || []);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    }

    fetchAllUsers();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "" && tripId) {
      const messagesRef = ref(db, `chatrooms/${tripId}/messages`);
      push(messagesRef, {
        username,
        profilePhoto:user.imageUrl,
        message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  if (!isLoaded || !trip) {
    return <Loading />;
  }


  return (
    <div className="flex flex-row items-center">
      <AllUsers users={allUsers} tripId={tripId} />
      <div className="p-20 w-auto m-auto">
        <h2>Chatroom for trip: {trip.title}</h2>
        <div className="border-solid border-black border-2 p-10 h-auto overflow-y-scroll"
        >
          {messages.map((msg, index) => (
            <div key={index} className={``}>
              <div className={`flex ${msg.username== username?"flex-row-reverse justify-start":" flex-row justify-start "} items-center `}>

                <TooltipProvider><Tooltip>
                  <TooltipTrigger>
                  <Avatar className={`my-4 ${msg.username== username?"ml-10":"mr-10"}`}>
                    <AvatarImage src={msg.profilePhoto} />
                    <AvatarFallback>Sender</AvatarFallback>
                  </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>{msg.username}</TooltipContent>
                  </Tooltip></TooltipProvider>

                  <div className="text-sm">
                  {msg.message}
                  </div>
                </div>
              
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="mt-10">
          <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mr-4"
            disabled
          />
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 mr-3"
          />
          <button type="submit"><SendHorizontal/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
