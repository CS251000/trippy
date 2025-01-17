"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "simplebar-react/dist/simplebar.min.css";
import { formatTimestamp } from "@/app/utils/util";
import TripDetailsHostCard from "@/components/trips/TripDetailsHost";
import LoadingDetails from "./loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TripHostDashboard = () => {
  const { id } = useParams();
  const { user, isLoaded, isSignedIn } = useUser();

  const [trip, setTrip] = useState(null);
  const [dates, setDates] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  const [itinerary, setItinerary] = useState({});
  const [members,setMembers]= useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  

  function getDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    while (start <= end) {
      dates.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {

    if (!isLoaded || !isSignedIn) return;

    async function fetchTrip() {
      try {
        const response = await fetch(`/api/get-trip-info?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch trip details.");

        const data = await response.json();
        setTrip(data.trip);

        const datesBetween = getDates(data.trip.startDate, data.trip.endDate);
        setDates(datesBetween);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    }

    // Fetch itinerary data
    async function fetchItinerary() {
      try {
        const body = {
          userId: user.id,
          tripId: id,
        };

        const response = await fetch("/api/get-itinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Failed to fetch itinerary.");

        const data = await response.json();

        if (data.success) {
          const itineraryItems = data.itinerary;
          const newItinerary = {};

          itineraryItems.forEach((item) => {
            const [startDate, startTime] = formatTimestamp(item.startTime);
            const [endDate, endTime] = formatTimestamp(item.endTime);

            if (!newItinerary[startDate]) {
              newItinerary[startDate] = [];
            }

            newItinerary[startDate].push({
              ...item,
              startTime,
              endTime,
            });
          });

          setItinerary(newItinerary);
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    }

    fetchTrip();
    fetchItinerary();
  }, [id, user, isLoaded, isSignedIn]);

  useEffect(() => {
    if (!trip?.id) return;

    async function fetchMembers() {
      try {
        setLoadingMembers(true);
        const response = await fetch(`/api/get-trip-members?tripId=${trip.id}`);
        if (!response.ok) throw new Error("Failed to fetch trip members.");

        const data = await response.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching trip members:", error);
      } finally {
        setLoadingMembers(false);
      }
    }

    fetchMembers();
  }, [trip]);

  if (!isLoaded || !trip) {
    return <LoadingDetails />;
  }

  console.log("trip",trip);

  

  return (
    <div className=" itinerary">
      {<TripDetailsHostCard trip={trip} itinerary={itinerary} dateIndex={dateIndex} dates={dates} setItinerary={setItinerary} setDateIndex={setDateIndex} members={members}/>}

      <Link href={`/chatroom/${trip.id}`}>
      <Button className="mt-4">Go to chatroom for {trip.id}</Button>
      </Link>
      <Link href={`/trip-gallery/${trip.id}`}>
      <Button className="m-3" variant="outline">
        Gallery for {trip.id}
      </Button>
      </Link>

    </div>
  );
};

export default TripHostDashboard;
