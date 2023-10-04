'use client'

import { ComponentPropsWithRef } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const SignOutButton: React.FC<ComponentPropsWithRef<'button'>> = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    const signOutResponse = await signOut({
      callbackUrl: '/login',
      redirect: false,
    })
    console.log(signOutResponse)
    // => { url: "http://localhost:3000/login" }
    router.push('/login')
  }

  return (
    <Button variant="default" size="default" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}

export default SignOutButton
