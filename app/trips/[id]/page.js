"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import TripDetailsCard from "@/components/trips/TripDetailsCard";
import LoadingDetails from "./loading";

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

  // console.log("images",trip.images);

  if (loading) return <LoadingDetails />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {trip ? (
        <TripDetailsCard trip={trip} /> 
      ) : (
        <p>No trip details available.</p>
      )}
    </div>
  );
};

export default TripDetailsTraveller;
