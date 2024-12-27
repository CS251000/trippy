"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

const TripDetailsTraveller = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const res = await fetch(`/api/get-trip-info?id=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch trip details");
        }
        const data = await res.json();
        setTrip(data.trip);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrip();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div><Link href={'/'}>Home</Link></div>
      <Link href={'/traveller'}>All trips</Link>
      <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
      {trip ? (
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">{trip.title}</h2>
          <p><strong>Destination:</strong> {trip.destination}</p>
          <p><strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}</p>
          <p><strong>Budget:</strong> ${trip.budget}</p>
          <p><strong>Type:</strong> {trip.type}</p>
          <p><strong>Status:</strong> {trip.status}</p>
          {trip.description && <p><strong>Description:</strong> {trip.description}</p>}
        </div>
      ) : (
        <p>No trip details available.</p>
      )}
    </div>
  );
};

export default TripDetailsTraveller;
