import Link from "next/link";
import Image from "next/image";

export const NavbarPage = () => {
    return (
        <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-black text-white font-mono shadow-lg">
            <div className="flex items-center space-x-2">
                <Image src="/logo.png" width={40} height={30} alt="logo" />
                <Link href="/" scroll={true}>
                    <div className="text-xl font-bold cursor-pointer">Trippy</div>
                </Link>
            </div>

            <div className="flex space-x-8">
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

            <div>
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
