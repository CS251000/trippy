"use client";

import React from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function TravellerTripPage() {
    const {tripId}= useParams();
  return (
    <div>
      welcome to {tripId}
      <Link href={`/chatroom/${tripId}`}>
      <Button className="mt-4">Go to chatroom for {tripId}</Button>
      
      </Link>
      <Link href={`/trip-gallery/${tripId}`}>
      <Button className="m-3" variant="outline">
        Gallery for {tripId}
      </Button>
      </Link>
    </div>
  )
}
