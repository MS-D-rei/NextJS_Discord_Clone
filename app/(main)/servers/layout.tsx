import { PropsWithChildren } from 'react'

const ServerIdLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='h-full'>
      <div className="hidden md:flex flex-col h-full w-[72px] z-30 fixed inset-y-0">
        {/* TODO: NavigationSidebar */}
        {/* <NavigationSidebar /> */}
      </div>
      <main className='h-full md:pl-[72px]'>
        {children}
      </main>
    </div>
  )
}

export default ServerIdLayout
