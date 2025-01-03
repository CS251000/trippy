"use client";

import Image from "next/image";
import { Star, UserPlus, UserPlus } from "lucide-react";

import { useUser } from "@clerk/nextjs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import TripDetailsTabs from "./TripDetailsTabs";
import Link from "next/link";

export default function TripDetailsCard({ trip }) {
  const {user}=useUser();
  const {userId}= user.id;
  // Utility function to format dates to "1 December, 2024"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  const date1 = new Date(trip.startDate);
  const date2 = new Date(trip.endDate);
  const day1 = date1.getDate();
  const month1 = date1.toLocaleString("default", { month: "long" });
  const year1 = date1.getFullYear();
  const day2 = date2.getDate();
  const month2 = date2.toLocaleString("default", { month: "long" });
  const year2 = date2.getFullYear();

  const formatDestination = (destination) => {
    if (!destination) return "N/A";
    const parts = destination.split(",").map((part) => part.trim());
    return parts.slice(1).join(", ");
  };
  const dest = formatDestination(trip.destination);
  const date1 = new Date(trip.startDate);
  const date2 = new Date(trip.endDate);
  const day1 = date1.getDate();
  const month1 = date1.toLocaleString("default", { month: "long" });
  const year1 = date1.getFullYear();
  const day2 = date2.getDate();
  const month2 = date2.toLocaleString("default", { month: "long" });
  const year2 = date2.getFullYear();

  const formatDestination = (destination) => {
    if (!destination) return "N/A";
    const parts = destination.split(",").map((part) => part.trim());
    return parts.slice(1).join(", ");
  };
  const dest = formatDestination(trip.destination);
  const tripType = trip.type ? trip.type.join(" | ") : "N/A"; 

  return (
    <div className="w-screen mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white ml-2">
            {trip.title}
          </h1>

          <div className="flex items-center mr-10">
            <span className="font-semibold text-lg">Rating: </span>
            <div className="flex items-center ml-2">
              <div className="flex">
                {/* Filled stars */}
                {[...Array(Math.floor(trip.rating || 0))].map((_, index) => (
                  <Star
                    key={`filled-${index}`}
                    className="w-4 h-4 text-yellow-300 fill-yellow-400"
                  />
                ))}

                {/* Unfilled stars */}
                {[...Array(5 - Math.floor(trip.rating || 0))].map(
                  (_, index) => (
                    <Star
                      key={`unfilled-${index}`}
                      className="w-4 h-4 text-gray-300 fill-none stroke-current"
                    />
                  )
                )}
              </div>
            </div>
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
              ({trip.rating}/5)
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between mt-5">
          {/* First Line */}
          <div className="flex items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
              />
            </svg>
            <span className="px-2 text-gray-500 text-xl">
              {year2} : {month1} {day1} - {month2} {day2}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 text-gray-500 ml-7"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="px-2 text-gray-500 text-xl">{dest}</span>
          </div>

          {/* Second Line */}
          <div className="flex items-center justify-between w-full mt-4">
            {/* Left: Trip Type */}
            <span className="text-cyan-500 text-lg px-4 mt-2">{trip.type}</span>

            {/* Right: Trip Status */}
            <span className="text-gray-500 text-2xl text-right">{`Trip ${trip.status}`}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12 ">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {trip.images && trip.images.length > 0 ? (
                trip.images.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/3">
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
        <div className="mt-4 flex flex-row justify-between items-center ">
          <p className="text-lg">{trip.description}</p>
          <Card className="bg-slate-100 w-auto text-center rounded-xl border-gray-700 border-4 mr-7 mt-4">
            <CardHeader>
              <CardTitle className="text-4xl">
                {trip.budget} <span className="text-xl text-gray-500">INR</span>
              </CardTitle>
              <CardDescription className="flex items-center space-x-2 text-black text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>
                  Hurry Up,{" "}
                  <span className="text-red-400">Limited spots Available</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <UserPlus />
                Join Trip Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
