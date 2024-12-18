import { tripDetailsTable } from "@/db/schema"; // Adjust this path as needed
import { db } from "@/db";

export async function POST(req) {
  try {
    const { destination, start_date, end_date, description, user_id } = await req.json();

    if (!destination || !start_date || !end_date || !user_id) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    console.log("res se phle");

    const result = await db.insert(tripDetailsTable).values({
      destination,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      description
    });
    console.log("res se bad");

    return new Response(
      JSON.stringify({ message: "Trip details saved successfully!", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting trip details:", error);
    return new Response(
      JSON.stringify({ message: "Failed to save trip details.", error: error.message }),
      { status: 500 }
    );
  }
}
