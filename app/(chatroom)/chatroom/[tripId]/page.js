"use client";

import React from 'react'
import { useParams } from 'next/navigation';

export default function ChatroomPage() {
    const {tripId}= useParams();
  return (
    <div>
        welcome to chatroom for {tripId}
      
    </div>
  )
}
