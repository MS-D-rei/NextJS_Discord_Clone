import { getSessionAtServer } from '@/app/_helper/getSessionAtServer'
import prisma from '@/lib/prisma-client'

export const getCurrentUser = async () => {
  try {
    const session = await getSessionAtServer()
    console.log("getCurrentUser session", session);
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (err: any) {
    console.log(err)
    return null
  }
}
