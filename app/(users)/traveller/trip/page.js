"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function TravellerTripPage() {
    const searchParams = useSearchParams();
      const tripId = searchParams.get("tripId");
  return (
    <div>
      welcome to{tripId}
    </div>
  )
}
