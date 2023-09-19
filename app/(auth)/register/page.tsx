import Image from 'next/image'
import AuthForm from '@/app/(auth)/components/AuthForm'
import discordLogo from '@/public/images/discord-logo-white.svg'

const RegisterPage = () => {
  return (
    <div className="flex w-full justify-center md:grid-cols-2 md:gap-0 md:mx-4">
      {/* right side logo space */}
      <div
        className="hidden md:flex md:flex-col md:w-full md:items-center md:justify-center 
        md:max-w-md md:px-8 md:py-12 md:bg-gray-500 md:rounded-tl-lg md:rounded-bl-lg"
      >
        <Image src={discordLogo} alt="logo" className="py-8" />
        <h1 className="text-5xl font-bold text-white">Clone</h1>
      </div>
      {/* left side form space */}
      <div className="w-full max-w-md px-8 py-12 bg-gray-100 rounded-md md:rounded-tr-lg md:rounded-br-lg shadow">
        <div className="">
          <h2
            className="text-center text-2xl font-bold
          leading-9 tracking-tight text-gray-900"
          >
            Create your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

export default RegisterPage
