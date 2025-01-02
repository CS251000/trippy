"use client";
import Link from "next/link";
import { useParams } from "next/navigation";



const TripHostDashboard= ()=>{
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Trip host Dashboard</h1>
      <p>Welcome to the dashboard for Trip ID: {id}</p>
      <Link href={'/traveller'}>all trips</Link>
    </div>
  );
}
export default TripHostDashboard;
