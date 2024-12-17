import Link from "next/link";

export default function Home() {
  return (
    <>
    <div>Home page</div>
    <Link href={'/sign-up'}>
      <button className="bg-white text-black block">Signup</button>
    </Link>
    <Link href={'/sign-in'}>
      <button className="bg-white text-black block">Sign in</button>
    </Link>
    <Link href={'/managerDashboard'}>
      <button className="bg-white text-black block">Manager Dashboard</button>
    </Link>
    <Link href={'/participantDashboard'}>
    <button className="bg-white text-black block">Participant Dashboard</button>
    </Link>
    </>

  );
}
