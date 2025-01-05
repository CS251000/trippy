import { db } from "@/db";
import { itineraryItems, trips, usersToTrips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { userId, tripId } = body;

    try {
        const trip = await db
            .select()
            .from(usersToTrips)
            .leftJoin(trips, eq(usersToTrips.tripId, tripId))
            .where(eq(usersToTrips.userId, userId))
            .limit(1);

        if (!trip.length) {
            return NextResponse.json({ error: "Trip not found." }, { status: 404 });
        }

        const itinerary = await db
            .select()
            .from(itineraryItems)
            .where(eq(itineraryItems.tripId, tripId))
            .orderBy(itineraryItems.startTime, "asc");
        return NextResponse.json({ itinerary, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching itineray:", error);
        return NextResponse.json({ status: 500, error: error.message });
    }
}
