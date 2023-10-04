import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma-client'
import SignOutButton from '@/app/(setup)/components/SignOutButton'
import { useCurrentUser } from '@/app/_helper/useCurrentUser'

export default async function Home() {
  const currentUser = await useCurrentUser()
  console.log(currentUser)

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: currentUser?.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/server/${server.id}`)
  }

  return (
    <div>
      <h1>discord clone</h1>
      <SignOutButton />
    </div>
  )
}
