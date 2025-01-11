"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import TravellerTripCard from "@/components/trips/TravellerDashboardTripCard";

const TravellerDashboard = () => {
  const { userId } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();

  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchJoinedTrips = async () => {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      try {
        setLoading(true); // Start loading
        const res = await fetch(`/api/get-joined-trips?userId=${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch joined trips");
        }

        const data = await res.json();
        const trips = data.trips || [];
        console.log("Trips fetched:", trips);

        setUpcomingTrips(trips.filter((trip) => trip.trips.status === "Scheduled"));
        setOngoingTrips(trips.filter((trip) => trip.trips.status === "Ongoing"));
        setCompletedTrips(trips.filter((trip) => trip.trips.status === "Completed"));
      } catch (err) {
        console.error("Error fetching joined trips:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (isSignedIn && isLoaded) {
      fetchJoinedTrips();
    }
  }, [isSignedIn, isLoaded, userId]);

  if (!isLoaded || loading) {
    return <Loading />;
  }

  const userName = user?.firstName || user?.username || "Guest";

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Traveller Dashboard</h1>
      <p>Welcome, {userName}!</p>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing Trips</TabsTrigger>
          <TabsTrigger value="completed">Completed Trips</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <h2 className="mt-4 text-xl font-semibold">Upcoming Trips</h2>
          {upcomingTrips.length > 0 ? (
            <ul className="mt-2 flex flex-row flex-wrap">
              {upcomingTrips.map((trip) => (
                <li key={trip.trips.id}>
                  <TravellerTripCard tripinfo={trip.trips} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No upcoming trips.</p>
          )}
        </TabsContent>

        <TabsContent value="ongoing">
          <h2 className="mt-4 text-xl font-semibold">Ongoing Trips</h2>
          {ongoingTrips.length > 0 ? (
            <ul className="mt-2 flex flex-row flex-wrap">
              {ongoingTrips.map((trip) => (
                <li key={trip.trips.id}>
                  <TravellerTripCard tripinfo={trip.trips} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No ongoing trips.</p>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <h2 className="mt-4 text-xl font-semibold">Completed Trips</h2>
          {completedTrips.length > 0 ? (
            <ul className="mt-2 flex flex-row flex-wrap">
              {completedTrips.map((trip) => (
                <li key={trip.trips.id}>
                  <TravellerTripCard tripinfo={trip.trips} />
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

export default TravellerDashboard;
