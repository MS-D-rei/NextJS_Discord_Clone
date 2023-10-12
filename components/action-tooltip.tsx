import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode
  label: string
  side: 'top' | 'right' | 'bottom' | 'left' | undefined
  align: 'start' | 'center' | 'end' | undefined
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({
  children,
  label,
  side,
  align,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip
