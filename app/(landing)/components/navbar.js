"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/constants";

export const NavbarPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);


  

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
          <Link key={item.name} href={item.path} className="hover:text-gray-400">
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
        <Link href="/host" prefetch={true}>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Host a Trip
          </button>
        </Link>
        <Link href="/traveller" prefetch={true}>
          <button className="bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200">
            Find a Trip
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPage;
