import { redirect } from 'next/navigation'

import prismaClient from '@/lib/prisma-client'
import { useCurrentUser } from '@/app/_helper/useCurrentUser'
import NavigationAction from '@/components/navigation-sidebar/navigation-action'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

const NavigationSidebar: React.FC = async () => {
  const currentUser = await useCurrentUser()

  if (!currentUser) {
    return redirect('/login')
  }

  // get all servers that the current user is a member of
  const servers = await prismaClient.server.findMany({
    where: {
      members: {
        some: {
          userId: currentUser.id,
        },
      },
    },
  })

  return (
    <div className="flex flex-col h-full w-full items-center text-primary bg-[#E3E5E8] space-y-4 py-3">
      <NavigationAction />
      <Separator
        orientation="horizontal"
        className="h-[2px] w-10 bg-zinc-300 rounded-md mx-auto"
      />
      <ScrollArea className='flex-1 w-full'>
        {/* TODO: add server item to show each server that the user is a member of */}
        {servers.map((server) => (
          <div key={server.id}>{server.name}</div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default NavigationSidebar
