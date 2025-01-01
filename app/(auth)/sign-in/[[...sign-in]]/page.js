"use client";

// import { useEffect } from "react";
// import { SignIn, useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import NavbarPage from "@/components/Landing/LandingNavbar";

export default function SignInPage() {
//   const { user, isSignedIn, isLoaded } = useUser();

//   useEffect(() => {
//     console.log("here");


//       if (isSignedIn && user && isLoaded) {
//         console.log("User is signed in, proceeding to add user to DB");

//         const addUserToDB = async () => {
//           console.log("addUserToDB function triggered");

//           try {
//             const response = await fetch("/api/add-user", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 clerkId: user.id,
//                 fullName: user.fullName,
//                 username: user.username || "Guest",
//                 email: user.primaryEmailAddress.emailAddress,
//                 phoneNumber: user.primaryPhoneNumber?.phoneNumber || null,
//                 createdAt: user.createdAt,
//                 profileImage: user.imageUrl,
//                 age: 18,
//               }),
//             });

//             console.log("API response:", response);

//             if (!response.ok) {
//               console.log("Failed response:", response);
//               throw new Error("Failed to add user to the database");
//             }

//             console.log("User successfully added to the DB");
//           } catch (error) {
//             console.error("Error adding user to DB:", error);
//           }
//         };

//         addUserToDB();
//       } else {
//         console.log("User is not signed in");
      
//     }
//   }, [isSignedIn, user, isLoaded]); 

  return (
    <>
      <NavbarPage />
      <div className="bg-blue-500 bg-cover flex h-screen login-page flex-wrap justify-center pt-6">
        <SignIn />
      </div>
    </>
  );
}
