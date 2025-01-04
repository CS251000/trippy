"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import TripCard from "@/components/trips/TripCard";
import { tripTypes } from "@/lib/constants";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    minBudget: "",
    maxBudget: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("/api/get-trips");
        if (!res.ok) {
          throw new Error("Failed to fetch trips");
        }
        const data = await res.json();
        setTrips(data.tripsWithImages);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [filters]); // Re-fetch trips whenever filters change

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Filter trips based on the search term, type, min budget, and max budget
  const filteredTrips = trips
    .filter((trip) => {
      const minBudget = filters.minBudget ? parseFloat(filters.minBudget) : null;
      const maxBudget = filters.maxBudget ? parseFloat(filters.maxBudget) : null;

      return (
        (filters.type ? trip.type === filters.type : true) &&
        (minBudget ? trip.budget >= minBudget : true) &&
        (maxBudget ? trip.budget <= maxBudget : true)
      );
    })
    .filter((trip) => {
      // Search by title or destination
      const searchTermLower = searchTerm.toLowerCase();
      return (
        trip.title.toLowerCase().includes(searchTermLower) ||
        trip.destination.toLowerCase().includes(searchTermLower)
      );
    });

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by destination or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-end mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open Filter</Button>
          </SheetTrigger>
          <SheetContent position="right" size="sm">
            <SheetTitle>Filter Trips</SheetTitle>

            {/* Filter by Trip Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Trip Type</label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  {tripTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter by Budget */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Min Budget</label>
              <Input
                type="number"
                value={filters.minBudget}
                onChange={(e) => handleFilterChange("minBudget", e.target.value)}
                placeholder="Enter minimum budget"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Max Budget</label>
              <Input
                type="number"
                value={filters.maxBudget}
                onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
                placeholder="Enter maximum budget"
              />
            </div>

            <Button onClick={() => setFilters({ type: "", minBudget: "", maxBudget: "" })}>
              Reset Filters
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <p>No trips found with the selected filters.</p>
        )}
      </div>
    </div>
  );
}
