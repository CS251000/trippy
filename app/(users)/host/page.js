"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { ArrowLeft, Filter, Search, Share, MoreHorizontal } from 'lucide-react'
// import Image from "next/image"
// import Link from "next/link"

// import { Badge } from "@/components/ui/badge"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "2 May, 23", revenue: 13000, expenditure: 4000 },
  { date: "Jun 23", revenue: 15000, expenditure: 4200 },
  { date: "Jul 23", revenue: 14000, expenditure: 4500 },
  { date: "Aug 23", revenue: 16000, expenditure: 4100 },
  { date: "Sep 23", revenue: 13500, expenditure: 4300 },
  { date: "Oct 23", revenue: 14500, expenditure: 4400 },
  { date: "Nov 23", revenue: 15500, expenditure: 4200 },
  { date: "Today", revenue: 13546, expenditure: 4254 },
]


const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userAdded, setUserAdded] = useState(false);
  const [hostedTrips, setHostedTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("ongoing");

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
        const trips = data.trips || [];

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

  const renderContent = () => {
    switch (activeTab) {
      case "upcoming":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingTrips.length > 0 ? (
                <ul>
                  {upcomingTrips.map((trip) => (
                    <li key={trip.trips.id}>
                      Trip ID: {trip.trips.id}, Destination: {trip.trips.destination}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming trips.</p>
              )}
            </CardContent>
          </Card>
        );
      case "ongoing":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ongoing Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {ongoingTrips.length > 0 ? (
                <ul>
                  {ongoingTrips.map((trip) => (
                    <li key={trip.trips.id}>
                      Trip ID: {trip.trips.id}, Destination: {trip.trips.destination}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ongoing trips.</p>
              )}
            </CardContent>
          </Card>
        );
      case "completed":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Completed Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {completedTrips.length > 0 ? (
                <ul>
                  {completedTrips.map((trip) => (
                    <li key={trip.trips.id}>
                      Trip ID: {trip.trips.id}, Destination: {trip.trips.destination}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No completed trips.</p>
              )}
            </CardContent>
          </Card>
        );
      case "analytics":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Revenue and Expenditure</h3>
                  <Tabs defaultValue="monthly">
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
  
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--primary))",
                    },
                    expenditure: {
                      label: "Expenditure",
                      color: "hsl(var(--destructive))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis 
                        dataKey="date"
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenditure"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <div>Ongoing content</div>;
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="space-y-2">
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "ongoing" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </Button>
        </div>
      </div>
  
      {/* Main Content Area */}
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
