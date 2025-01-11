"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBar from "simplebar-react";
import ItineraryItemTraveller from "../itinerary/ItineraryItemTraveller";

export default function TripDetailsTabs({trip,dateIndex,dates,itinerary ,setItinerary,setDateIndex}) {
  return (
    <div>
      <Tabs defaultValue="itinerary" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" >

          <div className="itinerary-container border rounded border-gray-500 w-full">
            <div className="mb-4 flex justify-between">
              <select
                id="type"
                name="type"
                className="text-gray-900 text-sm border rounded-lg bg-gray-50"
                value={dateIndex}
                onChange={(e) => setDateIndex(Number(e.target.value))}
                required
              >
                {dates.map((date, index) => (
                  <option key={index} value={index}>
                    Day {index + 1} ({date})
                  </option>
                ))}
              </select>
            </div>

            <SimpleBar style={{ maxHeight: "440px" }}>
              <div className="itinerary-list">
                {itinerary[dates[dateIndex]] &&
                itinerary[dates[dateIndex]].length > 0 ? (
                  itinerary[dates[dateIndex]].map((item, index) => (
                    <ItineraryItemTraveller
                      key={index}
                      item={item}
                      date={dates[dateIndex]}
                      setItinerary={setItinerary}
                    />
                  ))
                ) : (
                  <div className="no-itinerary-message">
                    No itinerary available for this date.
                  </div>
                )}
              </div>
            </SimpleBar>
          </div>
        </TabsContent>

        <TabsContent value="weather">See weather here</TabsContent>
      </Tabs>
    </div>
  );
}
