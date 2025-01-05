import { db } from "@/db";
import { itineraryItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { itemId } = body;

        if (!itemId) {
            return NextResponse.json(
                { error: "Missing required fields (ItemId)." },
                { status: 400 }
            );
        }
        const result = await db
            .delete(itineraryItems)
            .where(eq(itineraryItems.id, itemId));

        if (result.count === 0) {
            return NextResponse.json(
                { error: "Item not found or already deleted." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Itinerary item deleted successfully.", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting itinerary item:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
