import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma-client'
import SignOutButton from '@/app/(setup)/components/SignOutButton'
import { useCurrentUser } from '@/app/_helper/useCurrentUser'
import InitialModal from '@/components/modals/initial-modal'

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
    return redirect(`/servers/${server.id}`)
  }

  return (
    <>
      <InitialModal />
      <SignOutButton />
    </>
  )
}
