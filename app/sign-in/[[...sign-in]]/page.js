import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
    return(
        <>
      <SignIn />
      <Link href={'/'}>
        <button className='bg-background text-foreground'>Home</button>
      </Link>
      </>
    
      ) 
}