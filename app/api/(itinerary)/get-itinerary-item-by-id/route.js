import { db } from "@/db";
import { itineraryItems, trips, usersToTrips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { itemId } = body;

    try {
        const item = await db
            .select()
            .from(itineraryItems)
            .where(eq(itineraryItems.id, itemId))
        return NextResponse.json({ item, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching itineray:", error);
        return NextResponse.json({ status: 500, error: error.message });
    }
}
