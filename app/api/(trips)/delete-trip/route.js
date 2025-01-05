import { db } from "@/db";
import { trips } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  
    try {
        const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({status:400},{success:true},{message:"Trip ID required"})
      }

      await db.delete(trips).where(eq(trips.id,id));

    

      return NextResponse.json({status:200},{success:true},{message:"Trip Deleted Successfully"})
    } catch (error) {
      console.error("Error deleting trip:", error);
      return NextResponse.json({status:500},{success:false},{message:"Trip cant be Deleted Successfully"})
    
    }
  } 
