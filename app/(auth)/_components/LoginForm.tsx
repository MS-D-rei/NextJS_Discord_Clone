'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

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
  email: z
    .string()
    .email()
    .min(8, { message: 'email must be at least 8 characters' })
    .max(50, { message: 'email must be within 50 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password must be within 50 characters' }),
})

export const LoginForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('isSubmitting', form.formState.isSubmitting)
    console.log(data)

    console.log('Submit login started')

    signIn('credentials', { ...data, callbackUrl: '/', redirect: false }).then(
      (callback) => {
        console.log(callback)
        if (callback?.ok) {
          console.log('callback ok', callback.ok)
          router.push('/')
        }
        if (callback?.error) {
          console.log('callback error', callback.error)
        }
      },
    )

    console.log('Submit login finished')
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" {...field} />
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
            <div className="flex items-center justify-start">
              <p className="text-sm">Need an account?</p>
              <Link
                href="/register"
                className="ml-2 text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
