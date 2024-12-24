"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

            <div className="hidden md:flex items-center space-x-8">
                <Link href="/home" className="hover:text-gray-400">
                    Home
                </Link>
                <Link href="/about-us" className="hover:text-gray-400">
                    About Us
                </Link>
                <Link href="/places" className="hover:text-gray-400">
                    Places
                </Link>
                <Link href="/services" className="hover:text-gray-400">
                    Services
                </Link>
            </div>

            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-white text-2xl">
                    {isOpen ? "X" : "☰"}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 right-8 bg-black text-white rounded-lg shadow-lg w-48 py-4 px-6">
                    <Link href="/home" className="block py-2 hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="/about-us" className="block py-2 hover:text-gray-400">
                        About Us
                    </Link>
                    <Link href="/places" className="block py-2 hover:text-gray-400">
                        Places
                    </Link>
                    <Link href="/services" className="block py-2 hover:text-gray-400">
                        Services
                    </Link>
                    <Link href="/contact-us" className="block py-2 hover:text-gray-400">
                        Contact Us
                    </Link>
                </div>
            )}

            {/* Contact Us Button for larger screens (md and above) */}
            <div className="hidden md:block">
                <Link href="/contact-us">
                    <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 font-semibold">
                        Contact Us
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NavbarPage;
