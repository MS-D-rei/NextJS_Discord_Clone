import { getCurrentUserAtServer } from '@/app/_actions/getCurrentUserAtServer'
import { UserInfo } from '@/types/user-info'

export const useCurrentUser = async () => {
  const currentUserData = await getCurrentUserAtServer()

  if (!currentUserData) {
    return null
  }

  const currentUser: UserInfo = {
    id: currentUserData.id,
    createdAt: currentUserData.createdAt,
    name: currentUserData?.name,
    email: currentUserData.email,
    image: currentUserData?.image,
  }

  return currentUser
}
