import { db } from "@/db";
import { trips, usersToTrips } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId in request" },
      { status: 400 }
    );
  }

  try {
    const joinedTrips = await db
      .select()
      .from(usersToTrips)
      .leftJoin(trips, eq(usersToTrips.tripId, trips.id))
      .where(and(eq(usersToTrips.userId, userId), eq(usersToTrips.role, "member")));

    return NextResponse.json({ trips: joinedTrips }, { status: 200 });
  } catch (error) {
    console.error("Error fetching joined trips:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
