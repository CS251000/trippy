"use client";
import { useParams } from 'next/navigation';

const TripDetailsTraveller = () => {
  const { id } = useParams();



  return (
    <div>
      <h1>Trip Details</h1>
      <p>Trip ID: {id}</p>
    </div>
  );
};

export default TripDetailsTraveller;
