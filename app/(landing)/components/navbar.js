import Link from "next/link";

export const NavbarPage = () => {
    return(
        <div className="flex flex-row space-x-4">
            <div> Navbar</div>
            <div>
                <Link href={'/sign-up'}>
                <button className="bg-white text-black block">Signup</button>
                </Link>
            </div>
            <div>
                <Link href={'/sign-in'}>
                <button className="bg-white text-black block">Sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default NavbarPage;