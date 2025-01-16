"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCirclePlus } from "lucide-react";
import Link from "next/link";

export default function AllUsers({ users }) {
  const sortedUsers = [...users].sort((a, b) =>
    (a.users.fullName || "").localeCompare(b.users.fullName || "")
  );
  return (
    <div className="m-8">
      <ScrollArea className="h-72 w-64 rounded-md border">
        <div className="p-4">
          <h2 className="mb-4 text-lg font-bold leading-none">All Members</h2>
          <Separator className="my-2" />
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user, index) => (
              <div key={user.users.clerkId}>
                <div className="flex flex-row items-center justify-between">
                  <Avatar className="m-2">
                    <AvatarImage src={user.users.profileImage} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>

                  <div className="text-sm">
                    {user.users.fullName || "Unknown User"}
                  </div>
                  <Link
                    href={`/chat-member?receiverId=${user.users.clerkId}&fullName=${user.users.fullName}`}
                  >
                    <MessageCirclePlus />
                  </Link>
                </div>
                <Separator className="my-2" />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No users available</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
