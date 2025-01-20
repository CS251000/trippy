"use client";

import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCirclePlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AllUsers({ users, tripId }) {
    const sortedUsers = [...users].sort((a, b) =>
        (a.users.fullName || "").localeCompare(b.users.fullName || "")
    );
    const searchParams = useSearchParams();
    const recId = searchParams.get("receiverId");

    useEffect(() => {
        console.log(recId, users)
    })

    return (
        <div className="sticky top-0 chat-users">
            <div className="p-4 flex flex-col">
                <h2 className="mb-4 text-lg font-bold leading-none justify-center">
                    All Members
                </h2>
                <Separator className="my-2" />
                {/* Wrapping the list with SimpleBar */}
                <SimpleBar
                    style={{
                        maxHeight: "calc(100vh - 100px)", // Ensures scrollable height, adjust as needed
                    }}
                >
                    {sortedUsers.length > 0 ? (
                        sortedUsers.map((user) => (
                            <>
                            <div key={user.users.clerkId} className={`${recId == user.users.clerkId ? "rounded border border-blue-300 bg-gray-100" : ""} px-3 hover:bg-gray-100`}>
                                <Link
                                    href={`/chat-member?receiverId=${user.users.clerkId}&fullName=${user.users.fullName}&tripId=${tripId}`}
                                >
                                    <div className="flex flex-row items-center justify-between cursor-pointer">
                                        <Avatar className="m-2">
                                            <AvatarImage
                                                src={user.users.profileImage}
                                            />
                                            <AvatarFallback>
                                                User
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="text-sm">
                                            {user.users.fullName ||
                                                "Unknown User"}
                                        </div>

                                        <MessageCirclePlus />
                                    </div>
                                </Link>
                            </div>
                                <Separator className="my-2" />
                                </>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500">
                            No users available
                        </div>
                    )}
                </SimpleBar>
            </div>
        </div>
    );
}
