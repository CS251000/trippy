import { NextResponse } from "next/server";
import { db } from "@/db";
import { tripDetailsTable } from "@/db/schema";

export async function GET() {
    try {
        const trips = await db.select().from(tripDetailsTable);
        return NextResponse.json({ success: true, trips });
    } catch (error) {
        console.error("Error fetching trips:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
