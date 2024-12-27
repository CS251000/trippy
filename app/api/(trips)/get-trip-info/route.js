import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 

    if (!id) {
        return NextResponse.json(
            { success: false, error: "Trip ID is required" },
            { status: 400 }
        );
    }

    try {
        
        const trip = await db.select().from(trips).where(eq(trips.id,id));

        if (trip.length === 0) {
            return NextResponse.json(
                { success: false, error: "Trip not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, trip: trip[0] });
    } catch (error) {
        console.error("Error fetching trip:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
