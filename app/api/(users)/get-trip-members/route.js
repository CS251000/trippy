import { db } from "@/db";
import { usersToTrips, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("tripId");

    try {
        const members = await db
            .select()
            .from(usersToTrips)
            .leftJoin(users, eq(usersToTrips.userId, users.clerkId)) 
            .where(
                and(
                    eq(usersToTrips.tripId, tripId),
                    eq(usersToTrips.role, "member")
                )
            );

            // console.log("members",members);

        return NextResponse.json({ members }, { status: 200 });
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            { status: 500, error: error.message }
        );
    }
}
