import Image from 'next/image'

import { UserInfo } from '@/types/user-info'

interface UserAvatarProps {
  user: UserInfo
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="h-[48px] w-[48px] rounded-full overflow-hidden bg-sky-400">
      <Image
        src={user?.image || '/images/placeholder.jpg'}
        alt="User Button"
        height={48}
        width={48}
      />
    </div>
  )
}

export default UserAvatar
