"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

const HeroCarousel = () => {
  const { isSignedIn } = useUser(); // Get user sign-in status from Clerk

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[500px]">
        {/* <Image
          //   src="/group-travel.jpg" // Add your image path here
          alt="Group travel"
          layout="fill"
          objectFit="cover"
        /> */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 bg-black bg-opacity-40">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Group travel for communities
          </h1>
          <p className="text-lg text-white mb-6">
            Host a group trip of your own, or book a spot to travel with a
            built-in community.
          </p>
          <div className="flex gap-4 lg:hidden">
            
              <>
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
              </>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
