"use client";
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const TripDetailsTraveller = () => {
  const { userId } = useUser();



  return (
    <div>
      FILL YOUR TRAVELLER INFO HERE
    </div>
  );
};

export default TripDetailsTraveller;
