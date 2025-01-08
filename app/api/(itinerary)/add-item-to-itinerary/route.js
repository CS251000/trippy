import { db } from "@/db";
import { itineraryItems, trips, usersToTrips } from "@/db/schema";
import { getTripImage } from "@/lib/destImage";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, tripId, title, description, type, cost, location, startTime, endTime } = body;

        if (!tripId || !title || !type || !startTime) {
            return NextResponse.json(
                { error: "Missing required fields (tripId, title, type, startTime)." },
                { status: 400 }
            );
        }
        const imageurl= await getTripImage(location);

        if (new Date(startTime) > new Date(endTime)) {
            return NextResponse.json(
                { error: "Start time cannot be later than end time." },
                { status: 400 }
            );
        }
        const trip = await db
            .select()
            .from(usersToTrips)
            .leftJoin(trips, eq(usersToTrips.tripId, tripId))
            .where(eq(usersToTrips.userId, userId))
            .limit(1);
        

        if (!trip.length) {
            return NextResponse.json({ error: "Trip not found." }, { status: 404 });
        }

        const newItem = await db.insert(itineraryItems).values({
            tripId,
            title,
            description: description || null,
            type,
            cost: cost || null,
            location: location || null,
            image:imageurl,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status: "Upcoming",
        }).returning();

        return NextResponse.json(
            { message: "Itinerary item added successfully!", item: newItem, success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding itinerary item:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
