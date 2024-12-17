import { SignIn } from '@clerk/nextjs'

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