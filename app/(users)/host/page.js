"use client";

import { useUser } from "@clerk/nextjs";
import Error from "next/error";
import { useEffect,useState } from "react";

const HostDashboard = () => {
  const { user, isLoaded,isSignedIn } = useUser();
  const [userAdded, setUserAdded] = useState(false);
  const [hostedTrips,setHostedTrips]= useState([]);

  useEffect(() => {

          if (isSignedIn && user && isLoaded) {
            console.log("user", user);

            const addUserToDB = async () => {
    
              try {
                const response = await fetch("/api/add-user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    clerkId: user.id,
                    fullName: user.fullName||"GUEST",
                    username: user.username||"Anonymous",
                    email: user.primaryEmailAddress.emailAddress,
                    phoneNumber: user.primaryPhoneNumber?.phoneNumber || "+91999999999",
                    createdAt: user.createdAt,
                    profileImage: user.imageUrl||null,
                    age: 18,
                  }),
                });

    
                if (!response.ok) {
                  console.log("Failed response:", response);
                  throw new Error("Failed to add user to the database");
                }
                const data = await response.json();
                if (data.success) {
                  setUserAdded(true); 
                }
              } catch (error) {
                console.error("Error adding user to DB:", error);
              }
            };

            if (isSignedIn && user && isLoaded && !userAdded) {
              addUserToDB();
            }
          } else {
            console.log("User is not signed in");
          
        }
      }, [isSignedIn, user, isLoaded]); 

  useEffect(()=>{
    const fetchHostedTrips= async()=>{
      try{
        const res= await fetch(`/api/get-hosted-trips?userId=${user.id}`);
        if(!res.ok){
          throw new Error("failed to fetch hosted trips");
        }
        const data= await res.json();
        setHostedTrips(data.trips||[]);

      }catch(err){
        console.log("error in hosted trips",err);
      }
    };
    if (isSignedIn && user && isLoaded) {
      fetchHostedTrips();
    }
  },[isSignedIn,user,isLoaded]);
  if (!isLoaded) {
    return <p>Loading...</p>; 
  }

  const userId = user?.id;
  const userName = user?.firstName || user?.username || "Guest"; 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Trip Host Dashboard</h1>
      <p>Welcome, {userName}!</p>
      <p>Your User ID: {userId}</p>

      <h2 className="mt-4 text-xl font-semibold">Trips You've Hosted</h2>
      {hostedTrips.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {hostedTrips.map((trip) => (
            <li key={trip.tripId}>Trip ID: {trip.tripId}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-600">You haven't hosted any trips yet.</p>
      )}
    </div>
  );
};

export default HostDashboard;
