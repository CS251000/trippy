import { db } from "@/db";
import { usersToTrips } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("tripId");

    try {
        const tripHost = await db
            .select()
            .from(usersToTrips)
            .where(and(eq(usersToTrips.tripId, tripId),eq(usersToTrips.role,"host")) );

            // console.log("h",tripHost);

        return NextResponse.json({ host: tripHost }, { status: 200 });
    } catch (error) {
        console.error("Error fetching host:", error);
        return NextResponse.json({ status: 500, error: error.message });
    }
}
