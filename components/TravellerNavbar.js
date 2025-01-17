"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/constants";
import { SignInButton, SignUpButton, useUser, UserButton } from "@clerk/nextjs";
import { CircleUserRound, Plane } from "lucide-react";

export const TravellerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user,isLoaded } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);

  if( !isLoaded)return null;



  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-black text-white font-mono shadow-lg">
      <div className="flex items-center space-x-2">
        <Image src="/images/logo.png" width={40} height={30} alt="logo" />
        <Link href="/" scroll={true}>
          <div className="text-xl font-bold cursor-pointer">Trippy</div>
        </Link>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="hover:text-gray-400"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white text-2xl">
          {isOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Mobile Navbar */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-8 bg-black text-white rounded-lg shadow-lg w-48 py-4 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block py-2 hover:text-gray-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Call-to-Action Buttons */}
      <div className="hidden md:flex gap-4">
      <Link href={isSignedIn?`/traveller/dashboard/${user.id}`:`/trips`}>
        <button className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-600">
          <span className="flex flex-row "><Plane/>
          My Trips</span>
          
        </button>
        </Link>
        <Link href={'/host'}>
        <button className="bg-red-500 text-black py-2 px-4 rounded hover:bg-red-600">
        <span className="flex flex-row gap-2 "><CircleUserRound/>
        Host Dashboard</span>
        </button>
        </Link>
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">
              Hello, {user?.firstName || "User"}!
            </span>
            <UserButton />
          </div>
        ) : (
          <>
            <SignInButton>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Sign-in
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200">
                Sign-up
              </button>
            </SignUpButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TravellerNavbar;
