"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import TripCard from "@/components/trips/TripCard";

export default function TripsPage() {

 
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("/api/get-trips");
        if (!res.ok) {
          throw new Error("Failed to fetch trips");
        }
        const data = await res.json();
        console.log(data);
        setTrips(data.tripsWithImages);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);
  // console.log("trips",trips);

  

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
