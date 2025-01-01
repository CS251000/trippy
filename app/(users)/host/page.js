"use client";

import { useUser } from "@clerk/nextjs";

const HostDashboard = () => {
  const { user, isLoaded } = useUser();

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
     
    </div>
  );
};

export default HostDashboard;
