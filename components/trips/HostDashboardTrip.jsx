"use client";

import Link from "next/link";
import { Star } from "lucide-react"; // Import the Star icon

export default function HostTripCard({ tripinfo, onUpdate, onDelete }) {
  const trip = tripinfo;


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatDestination = (destination) => {
    if (!destination) return "N/A";
    const parts = destination.split(",").map((part) => part.trim());
    return `${parts[0]}, ${parts[2]}`;
  };

 
  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete the trip "${trip.title}"?`);
    if (confirmed) {
      onDelete(trip.id);
    }
  };
  

  return (
    <div className="w-auto m-2 max-w-sm bg-gray-200 border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 pb-5">
        <Link href={`/trips/host-trips/${trip.id}`}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-3">
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
        <span className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            ₹{trip.budget || "N/A"}
          </span>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1">
            {/* Render stars */}
            <div className="flex">
              {/* Filled stars */}
              {[...Array(Math.floor(trip.rating || 0))].map((_, index) => (
                <Star
                  key={`filled-${index}`}
                  className="w-4 h-4 text-yellow-300 fill-yellow-400"
                />
              ))}

              {/* Unfilled stars */}
              {[...Array(5 - Math.floor(trip.rating || 0))].map((_, index) => (
                <Star
                  key={`unfilled-${index}`}
                  className="w-4 h-4 text-gray-300 fill-none stroke-current"
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          
          <div className="flex space-x-2">
            <Link href={`/trips/host-trips/${trip.id}`}>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Info
              </button>
            </Link>
            <button
              onClick={() => onUpdate(trip.id)}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Star } from "lucide-react"; // Import the Star icon

export default function HostTripCard({ tripinfo, onUpdate, onDelete }) {
  const trip = tripinfo;


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatDestination = (destination) => {
    if (!destination) return "N/A";
    const parts = destination.split(",").map((part) => part.trim());
    return `${parts[0]}, ${parts[2]}`;
  };

 
  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete the trip "${trip.title}"?`);
    if (confirmed) {
      onDelete(trip.id);
    }
  };
  

  return (
    <div className="w-auto m-2 max-w-sm bg-gray-200 border border-gray-900 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 pb-5">
        <Link href={`/trips/hostside-trips/${trip.id}`}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-3">
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
        <span className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            ₹{trip.budget || "N/A"}
          </span>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1">
            {/* Render stars */}
            <div className="flex">
              {/* Filled stars */}
              {[...Array(Math.floor(trip.rating || 0))].map((_, index) => (
                <Star
                  key={`filled-${index}`}
                  className="w-4 h-4 text-yellow-300 fill-yellow-400"
                />
              ))}

              {/* Unfilled stars */}
              {[...Array(5 - Math.floor(trip.rating || 0))].map((_, index) => (
                <Star
                  key={`unfilled-${index}`}
                  className="w-4 h-4 text-gray-300 fill-none stroke-current"
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          
          <div className="flex space-x-2">
            <Link href={`/trips/hostside-trips/${trip.id}`}>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Info
              </button>
            </Link>
            <button
              onClick={() => onUpdate(trip.id)}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
