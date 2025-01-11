"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddItineraryItemForm from "../itinerary/AddItinerayItemForm";
import SimpleBar from "simplebar-react";
import ItineraryItem from "../itinerary/ItineraryItem";
import DataTableHostUsers from "./hostusersDataTable";
import { columns} from "./columnshostusers";

export default function TripDetailsHostTabs({ trip,dateIndex,dates,itinerary ,setItinerary,setDateIndex ,members}) {

  const usersData = members.map((member) => member.users);
  // console.log("fm",members);
  return (
    <div>
      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="travellers">Travellers</TabsTrigger>
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

              <AddItineraryItemForm
                tripId={trip.id}
                date={dates[dateIndex]}
                setItinerary={setItinerary}
              />
            </div>

            <SimpleBar style={{ maxHeight: "440px" }}>
              <div className="itinerary-list">
                {itinerary[dates[dateIndex]] &&
                itinerary[dates[dateIndex]].length > 0 ? (
                  itinerary[dates[dateIndex]].map((item, index) => (
                    <ItineraryItem
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
        <TabsContent value="travellers">
          <DataTableHostUsers columns={columns} data={usersData}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
