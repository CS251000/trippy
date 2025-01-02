import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { getTripImage } from "@/lib/destImage";

export  async function GET() {
    try {
        const tripsres = await db.select().from(trips);
        const tripsWithImages = await Promise.all(
            tripsres.map(async (trip) => {
              const imageUrl = await getTripImage(trip.destination); 
            //   console.log("imgurl",imageUrl);
              return { ...trip, imageUrl };
            })
          );
        return NextResponse.json(
            { success: true, tripsWithImages },
            
        );
    } catch (error) {
        console.error("Error fetching trips:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
