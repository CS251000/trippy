"use client";
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function TravellerTripForm() {
  const searchParams= useSearchParams();
  const tripId= searchParams.get('tripId');
  return (
    <div>
      trip form {tripId}
    </div>
  )
}
