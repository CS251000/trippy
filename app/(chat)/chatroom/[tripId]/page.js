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
import { MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const Chatroom = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [trip, setTrip] = useState(null);
  const [tripHost, setTripHost] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const { tripId } = useParams();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setUsername(user.username || user.fullName);
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (!isSignedIn || !isLoaded) return;
    async function getHost() {
      try {
        const res = await fetch(`/api/get-trip-host?tripId=${tripId}`);
        if (!res.ok) throw new Error("Failed to fetch trip host.");
        const host = await res.json();
        setTripHost(host.host[0]);
      } catch (err) {
        console.log("Error fetching host", err);
      }
    }
    getHost();
  }, [tripId, isLoaded, isSignedIn, user]);

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
        const newMessages = Object.values(data);
        setMessages(newMessages);

        // Show toasts for announcements
        newMessages
          .filter((msg) => msg.isAnnouncement)
          .forEach((announcement) =>
            toast(
              `${announcement.message}\n\n${new Date(
                announcement.timestamp
              ).toLocaleString()}`,
              {
                icon: "📢",
                duration: 5000,
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }
            )
          );
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

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendMessage = (message, isAnnouncement = false) => {
    if (message.trim() !== "" && tripId) {
      const messagesRef = ref(db, `chatrooms/${tripId}/messages`);
      push(messagesRef, {
        username,
        profilePhoto: user.imageUrl,
        message,
        isAnnouncement,
        timestamp: Date.now(),
      });
    }
  };

  const handleAnnouncementSubmit = () => {
    if (announcement.trim() !== "") {
      sendMessage(announcement, true);
      setAnnouncement("");
    }
  };

  const showAllAnnouncements = () => {
    const announcements = messages.filter((msg) => msg.isAnnouncement);
    announcements.forEach((announcement) =>
      toast(
        `${announcement.message}\n\n${new Date(
          announcement.timestamp
        ).toLocaleString()}`,
        {
          icon: "📢",
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      )
    );
  };

  if (!isLoaded || !trip || !tripHost) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-row justify-between items-center">
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
        <Button variant="destructive" onClick={showAllAnnouncements}>
          See Announcements
        </Button>
      </div>

      <div className="flex chat relative">
        {isMobileView ? (
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 transition-opacity duration-300 ${
              showUsers
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
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
          <>
            <div className="transition-all duration-300 w-64">
              <AllUsers users={allUsers} tripId={tripId} />
              {user.id === tripHost.userId && (
                <div>
                  <div className="text-black mt-10 bg-slate-50 p-4">
                    <textarea
                      className="w-full p-2 border rounded-md mb-2"
                      rows={3}
                      placeholder="Write an announcement..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleAnnouncementSubmit}
                    >
                      Post Announcement
                    </button>
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="chat-container flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    msg.username === username ? "sent" : "received"
                  } ${msg.isAnnouncement ? "announcement" : ""}`}
                >
                  <div className="bubble-content">
                    <span className="username">{msg.username}</span>
                    <div className="message">
                      <ReactMarkdown>{msg.message}</ReactMarkdown>
                    </div>
                    {msg.isAnnouncement && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <ComposeWithMarkdown onSendMessage={(msg) => sendMessage(msg)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
