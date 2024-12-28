import NavbarPage from '@/app/(landing)/components/Navbar'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
    return (
        <>
            <NavbarPage/>
            <div className="bg-blue-500 bg-cover flex h-screen login-page flex-wrap h-vh justify-center pt-6">
                <SignIn />
            </div>
        </>

    )
}