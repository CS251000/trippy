
import NavbarPage from '@/app/(landing)/components/Navbar'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {

    return (
        <>
            {/* <NavbarPage /> */}
            <div className="bg-blue-500 bg-cover flex h-screen login-page flex-wrap h-vh justify-center pt-6">
                <SignUp />
            </div>
        </>

    )
}