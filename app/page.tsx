'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  const handleSignOut = async () => {
    const signOutResponse = await signOut({
      callbackUrl: '/login',
      redirect: false,
    })
    console.log(signOutResponse)
    router.push('/login')
  }

  return (
    <div>
      <h1>discord clone</h1>
      <Button variant="default" size="default" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  )
}
