"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("/api/get-trips");
        if (!res.ok) {
          throw new Error("Failed to fetch trips");
        }
        const data = await res.json();
        setTrips(data.trips);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchTrips();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <UserButton />

      <Link href={"/"}>Home</Link>
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{trip.destination}</h2>
              <p className="text-sm">
                <strong>Start Date:</strong>{" "}
                {new Date(trip.start_date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <strong>End Date:</strong>{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </p>
              {trip.description && (
                <p className="text-sm mt-2">
                  <strong>Description:</strong> {trip.description}
                </p>
              )}
              {/* Correct dynamic route handling */}
              <Link href={`/traveller/${trip.id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Info
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
