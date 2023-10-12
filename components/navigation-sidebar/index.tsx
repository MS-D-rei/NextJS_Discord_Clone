import { redirect } from 'next/navigation'

import prismaClient from '@/lib/prisma-client'
import { useCurrentUser } from '@/app/_helper/useCurrentUser'
import { Separator } from '@/components/ui/separator'
import NavigationAction from '@/components/navigation-sidebar/navigation-action'

const NavigationSidebar: React.FC = async () => {
  const currentUser = await useCurrentUser()

  if (!currentUser) {
    return redirect('/login')
  }

  // get all servers that the current user is a member of
  const server = await prismaClient.server.findMany({
    where: {
      members: {
        some: {
          userId: currentUser.id,
        },
      },
    },
  })

  return (
    <div className="flex flex-col h-full w-full items-center text-primary bg-[#E3E5E8] py-3">
      <NavigationAction />
      <div>sidebar</div>
      <Separator orientation='horizontal' className="h-[2px] w-10 bg-zinc-300 rounded-md mx-auto" />
    </div>
  )
}

export default NavigationSidebar
