"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HostDashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userAdded, setUserAdded] = useState(false);
  const [hostedTrips, setHostedTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);

  useEffect(() => {
    if (isSignedIn && user && isLoaded) {
      const addUserToDB = async () => {
        try {
          const response = await fetch("/api/add-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              fullName: user.fullName || "GUEST",
              username: user.username || "Anonymous",
              email: user.primaryEmailAddress.emailAddress,
              phoneNumber: user.primaryPhoneNumber?.phoneNumber || "+91999999999",
              createdAt: user.createdAt,
              profileImage: user.imageUrl || null,
              age: 18,
            }),
          });

          if (!response.ok) {
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

      if (!userAdded) {
        addUserToDB();
      }
    }
  }, [isSignedIn, user, isLoaded, userAdded]);

  useEffect(() => {
    const fetchHostedTrips = async () => {
      try {
        const res = await fetch(`/api/get-hosted-trips?userId=${user.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch hosted trips");
        }

        const data = await res.json();
        // console.log(data);
        const trips = data.trips || [];
        // console.log("trips",trips);

        // Categorize trips by their status
        setUpcomingTrips(trips.filter((trip) => trip.trips.status === "Scheduled"));
        setOngoingTrips(trips.filter((trip) => trip.trips.status === "Ongoing"));
        setCompletedTrips(trips.filter((trip) => trip.trips.status === "Completed"));

        setHostedTrips(trips);
      } catch (err) {
        console.log("Error fetching hosted trips:", err);
      }
    };

    if (isSignedIn && user && isLoaded) {
      fetchHostedTrips();
    }
  }, [isSignedIn, user, isLoaded]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const userName = user?.firstName || user?.username || "Guest";

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Trip Host Dashboard</h1>
      <p>Welcome, {userName}!</p>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing Trips</TabsTrigger>
          <TabsTrigger value="completed">Completed Trips</TabsTrigger>
        </TabsList>

        {/* Upcoming Trips */}
        <TabsContent value="upcoming">
          <h2 className="mt-4 text-xl font-semibold">Upcoming Trips</h2>
          {upcomingTrips.length > 0 ? (
            <ul className="mt-2 list-disc list-inside">
              {upcomingTrips.map((trip) => (
                <li key={trip.trips.id}>
                  Trip ID: {trip.trips.id}, Destination: {trip.trips.destination}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No upcoming trips.</p>
          )}
        </TabsContent>

        {/* Ongoing Trips */}
        <TabsContent value="ongoing">
          <h2 className="mt-4 text-xl font-semibold">Ongoing Trips</h2>
          {ongoingTrips.length > 0 ? (
            <ul className="mt-2 list-disc list-inside">
              {ongoingTrips.map((trip) => (
                <li key={trip.trips.tripId}>
                  Trip ID: {trip.trips.tripId}, Destination: {trip.trips.destination}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No ongoing trips.</p>
          )}
        </TabsContent>

        {/* Completed Trips */}
        <TabsContent value="completed">
          <h2 className="mt-4 text-xl font-semibold">Completed Trips</h2>
          {completedTrips.length > 0 ? (
            <ul className="mt-2 list-disc list-inside">
              {completedTrips.map((trip) => (
                <li key={trip.trips.tripId}>
                  Trip ID: {trip.trips.tripId}, Destination: {trip.trips.destination}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No completed trips.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostDashboard;
