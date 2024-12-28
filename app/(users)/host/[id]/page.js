"use client";
import { useParams } from "next/navigation";

const TripHostDashboard= ()=>{
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Trip host Dashboard</h1>
      <p>Welcome to the dashboard for Trip ID: {id}</p>
      {/* Fetch and display trip-specific details here */}
    </div>
  );
}
export default TripHostDashboard;
