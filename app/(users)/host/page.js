"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HostTripCard from "@/components/trips/HostDashboardTrip";
import Link from "next/link";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";


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
                console.log("trips",trips);

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

    if (!isLoaded || !upcomingTrips || !ongoingTrips || !completedTrips) {
        return <Loading/>;
    }

  const onDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-trip?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the trip");
      }
  
      // Filter the deleted trip out of all trip categories
      const updatedHostedTrips = hostedTrips.filter((trip) => trip.trips.id !== id);
      const updatedUpcomingTrips = upcomingTrips.filter((trip) => trip.trips.id !== id);
      const updatedOngoingTrips = ongoingTrips.filter((trip) => trip.trips.id !== id);
      const updatedCompletedTrips = completedTrips.filter((trip) => trip.trips.id !== id);
  
      // Update the state
      setHostedTrips(updatedHostedTrips);
      setUpcomingTrips(updatedUpcomingTrips);
      setOngoingTrips(updatedOngoingTrips);
      setCompletedTrips(updatedCompletedTrips);
  
      alert("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Error deleting trip. Please try again.");
    }
  };
  
  
  


    const userName = user?.firstName || user?.username || "Guest";

    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Trip Host Dashboard</h1>
            <p>Welcome, {userName}!</p>

            <Tabs defaultValue="ongoing" className="w-full">
                <TabsList className="w-screen">
                    <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing Trips</TabsTrigger>
                    <TabsTrigger value="completed">Completed Trips</TabsTrigger>
                </TabsList>

                {/* Upcoming Trips */}
                <TabsContent value="upcoming">
                    <h2 className="mt-4 text-xl font-semibold">Upcoming Trips</h2>
                    {upcomingTrips.length > 0 ? (
                        <ul className="mt-2 flex flex-row flex-wrap">
                            {upcomingTrips.map((trip) => (
                                <li key={trip.trips.id}>
                                    
                                        <HostTripCard tripinfo={trip.trips} onDelete={onDelete} />
                                    
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
                        <ul className="mt-2 flex flex-row">
                            {ongoingTrips.map((trip) => (
                                <li key={trip.trips.id}>
                                    <Link href={`/host/trip/${trip.trips.tripId}`}>
                                        <HostTripCard tripinfo={trip.trips} onDelete={onDelete} />
                                    </Link>
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
                        <ul className="mt-2 flex flex-row">
                            {completedTrips.map((trip) => (
                                <li key={trip.trips.id}>
                                    <HostTripCard tripinfo={trip.trips} onDelete={onDelete}/>
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
