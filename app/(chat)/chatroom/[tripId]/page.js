"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import AllUsers from "./AllUsers";
import ReactMarkdown from "react-markdown";
import { Users } from "lucide-react";
import ComposeWithMarkdown from "@/components/chat/ComposeBox";
import { MdClose } from "react-icons/md"

const Chatroom = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [trip, setTrip] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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

  // Check screen size to toggle mobile/desktop view
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendMessage = (message) => {
    if (message.trim() !== "" && tripId) {
      const messagesRef = ref(db, `chatrooms/${tripId}/messages`);
      push(messagesRef, {
        username,
        profilePhoto: user.imageUrl,
        message,
        timestamp: Date.now(),
      });
    }
  };

  if (!isLoaded || !trip) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="sticky top-0 z-10 text-lg font-semibold text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm flex items-center justify-between">
        Chatroom for trip: {trip.title}
        {isMobileView ? (
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="block p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label="Toggle Users"
          >
            <Users className="w-5 h-5" />
          </button>
        ) : null}
      </h2>

      <div className="flex chat relative">
        {/* Sidebar for All Users */}
        {isMobileView ? (
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 transition-opacity duration-300 ${
              showUsers ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute top-[70px] w-full left-0 h-[calc(100%-70px)] bg-white shadow-lg transform transition-transform duration-300 ${
                showUsers ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <AllUsers users={allUsers} tripId={tripId} />
              <button
                onClick={() => setShowUsers(false)}
                className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                aria-label="Close Users"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`relative transition-all duration-300 w-64`}
          >
            <AllUsers users={allUsers} tripId={tripId} />
          </div>
        )}

        {/* Chat Section */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Chat Messages */}
            <div className="chat-container flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    msg.username === username ? "sent" : "received"
                  }`}
                >
                  <div className="bubble-content">
                    <span className="username">{msg.username}</span>
                    <p className="message">
                      <ReactMarkdown>{msg.message}</ReactMarkdown>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compose Box */}
            <ComposeWithMarkdown onSendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
