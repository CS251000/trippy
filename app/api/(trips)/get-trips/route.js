import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";

export  async function GET() {
    try {
        const tripsres = await db.select().from(trips);
        return NextResponse.json(
            { success: true, tripsres },
            {headers:{ "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" }}
        );
    } catch (error) {
        console.error("Error fetching trips:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
