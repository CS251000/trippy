import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getTripImages } from "@/lib/destImgs";
import dotenv from "dotenv"

dotenv.config({path:'.env.local'});



export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 

    if (!id) {
        return NextResponse.json(
            { success: false, error: "Trip ID is required" },
            { status: 400 }
        );
    }

    try {
        
        const trip = await db.select().from(trips).where(eq(trips.id,id));

        if (trip.length === 0) {
            return NextResponse.json(
                { success: false, error: "Trip not found" },
                { status: 404 }
            );
        }
        const tripData= trip[0];
        const imagesData= await getTripImages(tripData.destination);
        // console.log("simg",images);
        const images = imagesData ? imagesData.map(photo => {
            const pname = photo.name;
            return `https://places.googleapis.com/v1/${pname}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        }) : [];


        return NextResponse.json({ success: true, trip: {...tripData,images} });
    } catch (error) {
        console.error("Error fetching trip:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
