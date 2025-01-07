"use client";
import ItineraryItem from "@/components/itinerary/ItineraryItem";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddItineraryItemForm from "@/components/itinerary/AddItinerayItemForm";
import { useUser } from "@clerk/nextjs";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { formatTimestamp } from "@/app/utils/util";
import { FaCalendarAlt } from "react-icons/fa";

const TripHostDashboard = () => {
    const { id } = useParams();
    const  {user}  = useUser();
    console.log(user);
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
        async function fetchTrip() {
            try {
                const response = await fetch(`/api/get-trip-info?id=${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch trip details.");
                }
                const data = await response.json();
                setTrip(data.trip);
                const datesBetween = getDates(data.trip.startDate, data.trip.endDate);
                setDates(datesBetween);
            } catch (err) {
                console.error(err);
            }
        }

        async function fetchItinerary() {
            console.log("userid",user.id);
            const body = {
                userId: user.id,
                tripId: id,
            }
            const response = await fetch("/api/get-itinerary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch itinerary.");
            }
            const data = await response.json();
            if (data.success) {
                const itineraryItems = data.itinerary;
                for (const item of itineraryItems) {
                    const [startDate, startTime] = formatTimestamp(item.startTime);
                    const [endDate, endTime] = formatTimestamp(item.endTime);
                    setItinerary((itinerary) => ({
                        ...itinerary,
                        [startDate]: [
                            ...(itinerary[startDate] || []),
                            {
                                ...item,
                                startTime,
                                endTime,
                            },
                        ],
                    }));
                }
            }
        }
        fetchTrip();
        fetchItinerary();
    }, [id, user])

    return (
        <div className="p-4 itinerary">

            <h2 className="itinerary-title flex justify-center text-gray-600"><span className="mx-2 mt-1"><FaCalendarAlt /></span> Itinerary</h2>
            <div className="itinerary-container border rounded border-gray-500">
                <div className="mb-4 flex justify-between">
                    <select
                        id="type"
                        name="type"
                        className="text-gray-900 text-sm border rounded-lg bg-gray-50"
                        value={dateIndex}
                        onChange={(e) => { setDateIndex(Number(e.target.value)) }}
                        required
                    >
                        {dates.map(
                            (date, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    Day {index + 1} ({date})
                                </option>
                            )
                        )}
                    </select>
                    <AddItineraryItemForm tripId={id} date={dates[dateIndex]} setItinerary={setItinerary} />
                </div>
                <SimpleBar style={{ maxHeight: "440px" }}>
                    <div className="itinerary-list">
                        {(itinerary[dates[dateIndex]] && itinerary[dates[dateIndex]].length > 0) ? (
                            itinerary[dates[dateIndex]].map((item, index) => (
                                <ItineraryItem key={index} item={item} date={dates[dateIndex]} setItinerary={setItinerary} />
                            ))
                        ) : (
                            <div className="no-itinerary-message">
                                No itinerary available for this date.
                            </div>
                        )}
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}
export default TripHostDashboard;
