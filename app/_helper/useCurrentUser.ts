import { User } from '@prisma/client'
import { getCurrentUserAtServer } from '@/app/_actions/getCurrentUserAtServer'

export const useCurrentUser = async () => {
  const currentUserData = await getCurrentUserAtServer()

  if (!currentUserData) {
    return null
  }

  const currentUser: Partial<User> = {
    id: currentUserData.id,
    name: currentUserData?.name,
    email: currentUserData.email,
    image: currentUserData?.image,
  }

  return currentUser
}
