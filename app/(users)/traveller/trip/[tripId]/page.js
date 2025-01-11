"use client";

import React from 'react'
import { useParams } from 'next/navigation';
export default function TravellerTripPage() {
    const {tripId}= useParams();
  return (
    <div>
      welcome to {tripId}
    </div>
  )
}
