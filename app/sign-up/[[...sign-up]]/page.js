import Home from '@/app/page'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
    
  return(
    <>
  <SignUp />
  <Link href={'/'}>
    <button className='bg-background text-foreground'>Home</button>
  </Link>
  </>

  ) 
}