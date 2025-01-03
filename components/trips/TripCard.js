"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react"; // Import the Star icon

export default function TripCard({ trip }) {
  // Utility function to format dates to "1 December, 2024"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Utility function to shorten the destination
  const formatDestination = (destination) => {
    if (!destination) return "N/A";
    const parts = destination.split(",").map((part) => part.trim());
    return `${parts[0]}, ${parts[2]}`; // Return only the city and state
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/traveller/${trip.id}`}>
        {trip.imageUrl && (
          <Image
            src={trip.imageUrl}
            alt={trip.destination}
            width={300}
            height={200}
            className="w-full h-[250px] rounded-t-lg object-cover mb-2"
          />
        )}
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/traveller/${trip.id}`}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {trip.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Destination:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {formatDestination(trip.destination)}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Start Date:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {formatDate(trip.startDate)}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          End Date:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {formatDate(trip.endDate)}
          </span>
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1">
            {/* Render filled stars dynamically */}
            {[...Array(Math.floor(trip.rating || 0))].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-300 fill-yellow-400"
              />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {trip.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{trip.budget || "N/A"}
          </span>
          <Link href={`/traveller/${trip.id}`}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
