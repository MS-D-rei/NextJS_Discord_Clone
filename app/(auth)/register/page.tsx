import Image from 'next/image'

import { RegisterForm, FormLogo } from '@/app/(auth)/_components'
import discordLogoBlack from '@/public/images/discord-logo-black.svg'

const RegisterPage = () => {
  return (
    <div className="flex w-full justify-center md:grid-cols-2 md:gap-6 md:rounded-lg md:mx-4">
      {/* left side logo space */}
      <FormLogo />
      {/* right side form space */}
      <div
        className="w-full max-w-md px-8 py-12
        rounded-md md:rounded-none md:rounded-tr-lg md:rounded-br-lg
        shadow-md md:shadow-none"
      >
        <div className="">
          <Image
            src={discordLogoBlack}
            alt="logo"
            width={200}
            height={100}
            priority={true}
            className="md:hidden"
          />
          <p className="text-xl font-semibold md:hidden">Clone</p>
          <h2
            className="mt-8 text-center text-2xl font-bold
          leading-9 tracking-tight"
          >
            Create your account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
