import { RegisterForm, FormLogo } from '@/app/(auth)/_components'

const RegisterPage = () => {
  return (
    <div className="flex w-full justify-center md:grid-cols-2 md:gap-0 md:mx-4">
      {/* right side logo space */}
      <FormLogo />
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
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
