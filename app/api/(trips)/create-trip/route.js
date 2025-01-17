import { trips } from "@/db/schema";
import { usersToTrips } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { userId } = await auth();

    const formData = await req.formData();
    // console.log(formData);
    const title = formData.get("title");
    const destination = formData.get("destination");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const description = formData.get("description");
    const maxParticipants = formData.get("maxParticipants");
    const budget = formData.get("budget");
    let tripType = formData.get("trip_type");

    if (!destination || !start_date || !end_date) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    if (typeof tripType === "string") {
      tripType = JSON.parse(tripType);
    }

    const startDateParsed = new Date(start_date);
    const endDateParsed = new Date(end_date);

    const pastTrips = await db
      .select({
        rating: trips.rating,
      })
      .from(trips)
      .innerJoin(usersToTrips, eq(trips.id, usersToTrips.tripId))
      .where(
        and(eq(usersToTrips.userId, userId), eq(trips.status, "Completed"))
      );

    const totalRating = pastTrips.reduce(
      (sum, trip) => sum + (trip.rating || 0),
      0
    );
    const averageRating =
      pastTrips.length > 0 ? totalRating / pastTrips.length : 0;

    const result = await db
      .insert(trips)
      .values({
        title: title,
        destination: destination,
        startDate: startDateParsed,
        endDate: endDateParsed,
        description: description,
        participantsUpperLimit: maxParticipants,
        budget: budget,
        type: tripType,
        status: "Scheduled",
        rating: parseInt(averageRating),
      })
      .returning({ id: trips.id });
    const tripId = result[0].id;
    await db.insert(usersToTrips).values({
      userId,
      tripId,
      role: "host",
      status: "Scheduled",
    });

    return new Response(
      JSON.stringify({
        message: "Trip details saved successfully!",
        id: tripId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting trip details:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to save trip details.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
