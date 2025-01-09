"use client";

import ItineraryItem from "@/components/itinerary/ItineraryItem";
import AddItineraryItemForm from "@/components/itinerary/AddItinerayItemForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { formatTimestamp } from "@/app/utils/util";
import { FaCalendarAlt } from "react-icons/fa";
import TripDetailsHostCard from "@/components/trips/TripDetailsHost";
import LoadingDetails from "./loading";

const TripHostDashboard = () => {
  const { id } = useParams();
  const { user, isLoaded, isSignedIn } = useUser();

  const [trip, setTrip] = useState(null);
  const [dates, setDates] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  const [itinerary, setItinerary] = useState({});

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
          const newItinerary = {}; // Build the state update in one go

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

  if (!isLoaded || !trip) {
    return <LoadingDetails />;
  }

  

  return (
    <div className=" itinerary">
      {<TripDetailsHostCard trip={trip} itinerary={itinerary} dateIndex={dateIndex} dates={dates} setItinerary={setItinerary} setDateIndex={setDateIndex}/>}

    </div>
  );
};

export default TripHostDashboard;
