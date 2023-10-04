import { getSessionAtServer } from '@/app/_actions/getSessionAtServer'
import prisma from '@/lib/prisma-client'

export const getCurrentUserAtServer = async () => {
  try {
    const session = await getSessionAtServer()
    // console.log('getCurrentUser session', session)
    // getCurrentUser session { user: { name: 'John', email: 'test1@email.com', image: null } }
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
  } catch (err) {
    console.log(err)
    return null
  }
}
