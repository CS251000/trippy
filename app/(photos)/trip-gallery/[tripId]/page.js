"use client";

import { useParams } from 'next/navigation';
import React from 'react'

export default function TripPhotoGallery() {
  const {tripId}= useParams();
  return (
    <div>
      photo gallery for {tripId}
    </div>
  )
}
