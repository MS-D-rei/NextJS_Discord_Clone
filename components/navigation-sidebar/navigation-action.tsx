import { Plus } from 'lucide-react'

const NavigationAction: React.FC = () => {
  return (
    // TODO: wrap entire by ActionTooltip
    <div>
      <button type="button" className="group flex items-center">
        <div
          className="flex items-center justify-center h-[48px] w-[48px] rounded-[24px]
          group-hover:rounded-[16px] transition-all overflow-hidden bg-background group-hover:bg-emerald-500 mx-3"
        >
          <Plus
            size={24}
            className="transition text-emerald-500 group-hover:text-white"
          />
        </div>
      </button>
    </div>
  )
}

export default NavigationAction
