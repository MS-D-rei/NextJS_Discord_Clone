import { LoginForm, FormLogo } from '@/app/(auth)/_components'

const LoginPage = () => {
  return (
    <div className="flex w-full justify-center md:grid-cols-2 md:gap-0 md:rounded-lg md:mx-4">
      {/* right side logo space */}
      <FormLogo />
      {/* left side form space */}
      <div className="w-full max-w-md px-8 py-12 rounded-md md:rounded-none shadow md:rounded-tr-lg md:rounded-br-lg">
        <div className="">
          <h2
            className="text-center text-2xl font-bold
          leading-9 tracking-tight"
          >
            Welcome back!
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
