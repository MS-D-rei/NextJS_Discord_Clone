'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import ActionTooltip from '@/components/action-tooltip'

interface NavigationItemProps {
  id: string
  name: string
  image: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ id, name, image }) => {
  const params = useParams()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]',
            params?.serverId !== id && 'group-hover:h-[20px]',
          )}
        />
        <div
          className={cn(
            'relative group flex h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden mx-3',
            params?.serverId === id &&
              'bg-primary/10 text-primary rounded-[16px]',
          )}
        >
          <Image src={image} alt={`${name} icon`} fill />
        </div>
      </button>
    </ActionTooltip>
  )
}

export default NavigationItem
