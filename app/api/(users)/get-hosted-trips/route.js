import { db } from "@/db";
import { trips, usersToTrips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export  async function GET(req) {
    const {searchParams}= new URL(req.url);
    const userId= searchParams.get("userId");

    try {
      const hostedTrips = await db
        .select()
        .from(usersToTrips)
        .where(eq(usersToTrips.userId,userId));

        console.log("hosted",hostedTrips);
        
      return NextResponse.json({trips:hostedTrips},{status:200});
    } catch (error) {
      console.error("Error fetching hosted trips:", error);
      return NextResponse.json({status:500},{error:error.message});
    }
  } 

