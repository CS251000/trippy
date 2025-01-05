
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export  async function POST(req) {
  const body = await req.json();
  // console.log("body",body);
  const { clerkId, fullName, username, email, phoneNumber, createdAt, profileImage, age } = body;

  const formattedCreatedAt = createdAt
  ? new Date(createdAt).toISOString()
  : new Date().toISOString();
  

  try {

    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId,clerkId))
    .limit(1);

  if (existingUser.length > 0) {
    return NextResponse.json({ success: true, message: "User already exists" }, { status: 200 });
  }

    await db.insert(users).values({
      clerkId:clerkId,
      fullName:fullName,
      username:username,
      email:email,
      phoneNumber:phoneNumber,
      // createdAt:formattedCreatedAt,
      profileImage:profileImage,
      emergencyContact: null,
      age:age,
    }).onConflictDoNothing({target:users.clerkId});

    return NextResponse.json({ success: true },{status:200});
  } catch (error) {
    console.error("Error adding user to DB:", error);
    // console.log("body",body);
    return NextResponse.json({ error: "Failed to add user to the database" },{status:500});
  }
}
