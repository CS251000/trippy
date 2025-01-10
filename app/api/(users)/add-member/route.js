import { db } from "@/db";
import { users, usersToTrips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.formData();

    const body = Object.fromEntries(formData.entries());

  const { clerkId, fullName, username, email, phoneNumber, createdAt, profileImage, age, emergencyContact, tripId,aadharNumber } = body;


  try {
    await db.insert(users).values({
      clerkId,
      fullName,
      username,
      email,
      phoneNumber,
      // createdAt: createdAt,
      emergencyContact,
      age,
      adharCardNumber:aadharNumber,
    })
    .onConflictDoUpdate({
      target: users.clerkId, // Specify the unique constraint field
      set: {
        fullName,
        username,
        email,
        phoneNumber,
        emergencyContact,
        age,
        adharCardNumber: aadharNumber,
      },
    });

    await db.insert(usersToTrips).values({
      userId:clerkId,
      tripId,
      role: "member",
      status: "Scheduled",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json({ error: "Failed to add user to the database" }, { status: 500 });
  }
}
