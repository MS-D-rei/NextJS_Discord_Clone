'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(8).max(50),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password must be within 50 characters' }),
})

// https://react-hook-form.com/get-started#SchemaValidation

const AuthForm = () => {
  const pathname = usePathname()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('isSubmitting', form.formState.isSubmitting)
    console.log(data)

    if (pathname === '/register') {
      console.log('Submit register started')

      fetch('/services/register', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(() => {
          signIn('credentials', { ...data, callbackUrl: '/' })
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('Submit register ended')
    }

    if (pathname === '/login') {
      console.log('Submit login started')

      signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/',
      }).then((callback) => {
        console.log(callback)
        if (callback?.ok) {
          console.log('callback ok')
        }
        if (callback?.error) {
          console.log('callback error')
        }
      })

      console.log('Submit login ended')
    }
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {pathname === '/register' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
          <div className="flex items-center justify-between">
            {pathname === '/register' ? (
              <Link
                href="/login"
                className="text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline"
              >
                Already have an account?
              </Link>
            ) : (
              <div className="flex items-center justify-start">
                <p className="text-sm">Need an account?</p>
                <Link
                  href="/register"
                  className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm
