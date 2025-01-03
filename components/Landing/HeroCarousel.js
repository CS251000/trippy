"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

const HeroCarousel = () => {
    const { isSignedIn } = useUser(); // Get user sign-in status from Clerk

    return (
        <>
            <header className="bg-cover bg-center bg-blue-600 text-white hero-section">
                <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Plan Your Perfect Trip
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Discover new destinations, build your itinerary,
                            and travel with ease.
                        </p>
                        <Link href={'/trips'}>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition font-semibold">
                            Get Started
                        </button>
                        </Link>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <div className="w-full h-64 md:h-80 bg-gray-300 rounded-lg shadow-lg"></div>
                    </div>
                </div>
            </header>
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        How It Works
                    </h2>
                    <p className="text-lg mb-12">
                        Planning your trip has never been easier. Follow
                        these simple steps:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transform hover:scale-110 transition duration-300">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Create Itinerary
                            </h3>
                            <p className="text-sm">
                                Plan your dream destinations and stops.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transform hover:scale-110 transition duration-300">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Announce the Trip
                            </h3>
                            <p className="text-sm">
                                Share your plans with your group.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transform hover:scale-110 transition duration-300">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Invite Members
                            </h3>
                            <p className="text-sm">
                                Add friends and family to your trip.
                            </p>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transform hover:scale-110 transition duration-300">
                                4
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Travel
                            </h3>
                            <p className="text-sm">
                                Start your adventure and explore together.
                            </p>
                        </div>
                        {/* Step 5 */}
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transform hover:scale-110 transition duration-300">
                                5
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Enjoy
                            </h3>
                            <p className="text-sm">
                                Make memories that last a lifetime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Placeholder Section */}
            <section className="bg-blue-400 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Plan. Travel. Enjoy.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
                        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
                        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default HeroCarousel;
