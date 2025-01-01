
import { db } from "@/db";
import { users } from "@/db/schema";

export default async function POST(req) {
  console.log("db heres");
 

  const { clerkId, fullName, username, email, phoneNumber, createdAt, profileImage, age } = req.body;

  try {
    console.log("db here");
    await db.insert(users).values({
      clerkId,
      fullName,
      username,
      email,
      phoneNumber,
      createdAt: new Date(createdAt),
      profileImage,
      emergencyContact: null,
      age,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return res.status(500).json({ error: "Failed to add user to the database" });
  }
}
