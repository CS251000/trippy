"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TripDetailsTabs({trip}) {
  return (
    <div>
      <Tabs defaultValue="itinerary" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary">
          See itinerary here
        </TabsContent>

        <TabsContent value="weather">See weather here</TabsContent>
      </Tabs>
    </div>
  );
}
