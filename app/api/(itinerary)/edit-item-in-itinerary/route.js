import { db } from "@/db";
import { itineraryItems, trips, usersToTrips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { itemId, title, description, type, cost, location, startTime, endTime } = body;

        if (!title || !type || !startTime) {
            return NextResponse.json(
                { error: "Missing required fields (tripId, title, type, startTime)." },
                { status: 400 }
            );
        }

        if (new Date(startTime) > new Date(endTime)) {
            return NextResponse.json(
                { error: "Start time cannot be later than end time." },
                { status: 400 }
            );
        }

        const updatedItem = await db.update(itineraryItems).set({
            title,
            description: description || null,
            type,
            cost: cost || null,
            location: location || null,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status: "Upcoming",
        }).where(eq(itineraryItems.id, itemId)).returning();

        return NextResponse.json(
            { message: "Itinerary item edited successfully!", item: updatedItem, success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error editing itinerary item:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
