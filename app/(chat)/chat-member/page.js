"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import AllUsers from "../chatroom/[tripId]/AllUsers";
import ReactMarkdown from "react-markdown";
import { Users } from "lucide-react";
import ComposeWithMarkdown from "@/components/chat/ComposeBox";
import { MdClose } from "react-icons/md"


export default function IndividualMessagePage() {

    const router = useRouter();

    const searchParams = useSearchParams();
    const receiverId = searchParams.get("receiverId");
    const receiverName = searchParams.get("fullName");
    const tripId = searchParams.get("tripId");
    const [isMobileView, setIsMobileView] = useState(false);
    const { user, isSignedIn, isLoaded } = useUser();
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        if (!receiverId) return;
        if (user) {
            const chatId =
                user.id < receiverId ? `${user.id}_${receiverId}_${tripId}` : `${receiverId}_${user.id}_${tripId}`;
            const messagesRef = ref(db, `directMessages/${chatId}`);

            const unsubscribe = onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setMessages(Object.values(data));
                } else {
                    setMessages([]);
                }
            });

            return () => unsubscribe();
        }
    }, [user?.id, receiverId]);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    if (!isLoaded || !isSignedIn) {
        return <Loading />;
    }

    const senderId = user.id;

    const sendMessage = (message) => {
        if (message.trim() === "") return;

        const chatId =
            senderId < receiverId ? `${senderId}_${receiverId}_${tripId}` : `${receiverId}_${senderId}_${tripId}`;
        const messagesRef = ref(db, `directMessages/${chatId}`);

        push(messagesRef, {
            senderId,
            receiverId,
            message,
            timestamp: Date.now(),
        });
    };

    return (
        <>
            <h2 className="sticky top-0 z-10 text-lg font-semibold text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => router.push(`/chatroom/${tripId}`)}>
                    Back to chatroom for trip {tripId}
                </Button>
                <pre>Direct Message: {user.fullName} → {receiverName || "Receiver"}</pre>
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
                        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 transition-opacity duration-300 ${showUsers ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div
                            className={`absolute top-[70px] w-full left-0 h-[calc(100%-70px)] bg-white shadow-lg transform transition-transform duration-300 ${showUsers ? "translate-x-0" : "-translate-x-full"
                                }`}
                        >
                            <AllUsers users={allUsers} tripId={tripId} recId={receiverId} />
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
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 12.75h9m-9 3h5.25m-5.25-6h7.5M3.75 21h16.5a2.25 2.25 0 002.25-2.25v-13.5A2.25 2.25 0 0019.5 3h-15A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 003.75 21z"
                                        />
                                    </svg>
                                    <p className="text-lg font-semibold">No messages yet</p>
                                    <p className="text-sm text-gray-400">
                                        Start the conversation by sending a message!
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`chat-bubble ${msg.senderId === user.id ? "sent" : "received"}`}
                                    >
                                        <div className="bubble-content">
                                            <span className="username">{msg.username}</span>
                                            <p className="message">
                                                <ReactMarkdown>{msg.message}</ReactMarkdown>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>


                        {/* Compose Box */}
                        <ComposeWithMarkdown onSendMessage={sendMessage} />
                    </div>
                </div>
            </div>
        </>
    );
}
