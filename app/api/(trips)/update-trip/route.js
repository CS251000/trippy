import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 
    const formData = await req.formData();
    const updatedFields = {};


    for (const [key, value] of formData.entries()) {
      if (key === "trip_type") {
        updatedFields[key] = JSON.parse(value);

      } else if (key === "start_date" || key === "end_date") {
        updatedFields[key] = new Date(value); 

      } else if (key === "maxParticipants" || key === "budget") {
        updatedFields[key] = isNaN(value) ? null : parseFloat(value); // 
      } else {
        updatedFields[key] = value;
      }
    }

    await db
      .update(trips)
      .set(updatedFields)
      .where(eq(trips.id,id));

    return NextResponse.json({ message: "Trip updated successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
