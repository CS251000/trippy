"use client";

import { useState } from "react";
import { Sidebar,SidebarContent,SidebarTrigger,SidebarProvider } from "../ui/sidebar";
import { Checkbox } from "../ui/checkbox";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";
import { Label } from "../ui/label";

import { useRouter } from "next/router";

export default function FilterSidebar({ onFilterChange }) {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  
  const handleFilterChange = () => {
    onFilterChange({ destination: selectedDestination, date: selectedDate, price: selectedPrice });
  };

  return (
    <Sidebar>
      <SidebarTrigger>Filters</SidebarTrigger>
      <SidebarContent className="p-4">
        <h3 className="text-lg font-semibold">Filter Trips</h3>
        <div className="mt-4">
          <Label htmlFor="destination">Destination</Label>
          <Select onValueChange={setSelectedDestination} value={selectedDestination}>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paris">Paris</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Tokyo">Tokyo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="date">Date</Label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        
        <div className="mt-4">
          <Label htmlFor="price">Price Range</Label>
          <input
            type="number"
            id="price"
            placeholder="Maximum price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        
        <button
          onClick={handleFilterChange}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </SidebarContent>
    </Sidebar>
  );
}
