'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
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
import ImageUpload from '@/components/ImageUpload'
import { useSelectFile } from '@/app/_helper/useSelectFile'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Server name must be at least 3 characters' }),
  image: z.string().url({ message: 'Server image must be a valid URL' }),
})

const InitialModal: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  const { selectedFile, setSelectedFile } = useSelectFile()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
    },
  })

  if (!isMounted) return null

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('formData', data)

    try {
      const response = await fetch('/api/server', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      form.reset()
      setSelectedFile('')
      router.refresh()
      window.location.reload()
      console.log('response', response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="bg-white max-h-screen text-black p-0 overflow-y-auto">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 pb-8">
              <div className="flex flex-col space-y-4">
                {/* Image Upload */}
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
                {/* Server Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="serverName"
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 pl-2"
                      >
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          disabled={form.formState.isSubmitting}
                          placeholder="Enter server name"
                          className={`bg-zinc-300/50 text-black border-0
                          focus-visible:ring-0 focus-visible:ring-offset-0`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {formState.errors.name?.message}
                        {formState.errors.image?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                variant="primary"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
