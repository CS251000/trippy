"use client";
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function HostDashboard() {
    const pathName= usePathname();


  return (
    <div>
        <Link href={`${pathName}/host-trip-form`}>
        <button>Host trip</button>
        </Link>

    

      
    </div>
  )
}
