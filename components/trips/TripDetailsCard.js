"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TripDetailsCard({ trip }) {
  // Utility function to format dates to "1 December, 2024"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          {trip.title}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          {trip.description || "No description provided."}
        </p>

        {/* Carousel */}
        <div className="mt-5">
          <Carousel
          opts={{
            loop:true,
          }}
          >
            <CarouselContent>
              {trip.images && trip.images.length > 0 ? (
                trip.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-96 relative">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover" 
                        className="rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No images available.
                </p>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full">
              {"<"}
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full">
              {">"}
            </CarouselNext>
          </Carousel>
        </div>

        {/* Trip Details */}
        <div className="mt-6 space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Destination: </span>
            {trip.destination || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Start Date: </span>
            {formatDate(trip.startDate)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">End Date: </span>
            {formatDate(trip.endDate)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Budget: </span>₹{trip.budget || "N/A"}
          </p>
          <div className="flex items-center">
            <span className="font-semibold text-lg">Rating: </span>
            <div className="flex items-center ml-2">
              {[...Array(Math.floor(trip.rating || 0))].map((_, index) => (
                <Star
                  key={index}
                  className="w-5 h-5 text-yellow-300 fill-yellow-400"
                />
              ))}
            </div>
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
              ({trip.rating})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
