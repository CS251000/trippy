"use client";

import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import NavbarPage from "@/components/Landing/LandingNavbar";

export default function SignInPage() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log("here");
    if (isSignedIn && user) {
      const addUserToDB = async () => {
        try {
            console.log("hithere");
          const response = await fetch("/api/add-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              fullName: user.fullName,
              username: user.username || "Guest",
              email: user.primaryEmailAddress.emailAddress,
              phoneNumber: user.primaryPhoneNumber?.phoneNumber || null,
              createdAt: user.createdAt,
              profileImage: user.imageUrl,
              age: 18,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add user to the database");
          }
        } catch (error) {
          console.error("Error adding user to DB:", error);
        }
      };

      addUserToDB();
    }
  }, [isSignedIn, user]);

  return (
    <>
      <NavbarPage />
      <div className="bg-blue-500 bg-cover flex h-screen login-page flex-wrap h-vh justify-center pt-6">
        <SignIn />
      </div>
    </>
  );
}
