import { trips } from "@/db/schema"; 
import { db } from "@/db";

export async function POST(req) {
  try {
    const formData = await req.formData(); 
    // console.log(formData);
    const title= formData.get("title")
    const destination = formData.get("destination");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const description = formData.get("description");
    const maxParticipants = formData.get("maxParticipants");
    const budget = formData.get("budget");
    const tripType = formData.get("trip_type");
    const tripImage = formData.get("trip_image");



    // Validate required fields
    if (!destination || !start_date || !end_date) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    const startDateParsed = new Date(start_date);
    const endDateParsed = new Date(end_date);
    
    const result = await db
      .insert(trips)
      .values({
        title:title,
        destination:destination,
        startDate:startDateParsed,
        endDate:endDateParsed,
        description:description,
        participantsUpperLimit: maxParticipants,
        budget:budget,
        type:tripType,
        status:"Scheduled",

      })
      .returning({ id: trips.id }); 
      
    return new Response(
      JSON.stringify({
        message: "Trip details saved successfully!",
        id: result[0]?.id, 
      }),
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
