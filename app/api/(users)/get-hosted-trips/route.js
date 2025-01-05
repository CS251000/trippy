import { db } from "@/db";
import { trips, usersToTrips,reviews } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export  async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        const hostedTrips = await db
            .select()
            .from(usersToTrips)
            .leftJoin(trips, eq(usersToTrips.tripId, trips.id))
            .where(eq(usersToTrips.userId, userId));

        // console.log("hostedTrips", hostedTrips);
        const completedTrips = hostedTrips.filter(
            (trip) => trip.trips.status === "Completed"
          );

          for (const trip of completedTrips) {
            const averageRatingResult = await db
                .select({
                    averageRating: sql`AVG(${reviews.rating})`.as("average_rating"),
                })
                .from(reviews)
                .where(eq(reviews.tripId, trip.trips.id))
                .then((res) => res[0]);

                const averageRating = Math.round(averageRatingResult?.averageRating || 0);

            await db
                .update(trips)
                .set({ rating:averageRating })
                .where(eq(trips.id, trip.trips.id));
        }
        

        return NextResponse.json({ trips: hostedTrips }, { status: 200 });
    } catch (error) {
        console.error("Error fetching hosted trips:", error);
        return NextResponse.json({ status: 500, error: error.message });
    }
}
