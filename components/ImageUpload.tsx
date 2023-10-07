'use client'

import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { UseFormReturn, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'

const ImageUpload: React.FC = () => {
  // need to show the image preview
  const [selectedFile, setSelectedFile] = useState<string>()
  // need to invoke the hidden input
  const selectedFileRef = useRef<HTMLInputElement>(null)

  // can use useFormContext() to get the form context
  const form: UseFormReturn<{ name: string; image: string }, any, undefined> =
    useFormContext()

  const handleUploadClick = () => {
    selectedFileRef.current?.click()
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    console.log(event.target.files?.[0])

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
        form.setValue('image', readerEvent.target.result as string)
      }
    }
  }

  const handleRemoveClick = () => {
    setSelectedFile('')
    form.setValue('image', '')
  }

  // https://react-hook-form.com/faqs#Howtosharerefusage
  // to avoid overwrite the ref of react hook form,
  // we need to spread the ref to the input element.

  // https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback

  // react-hook-form value attribute should be removed.
  // otherwise, form.setValue() will try to update the value of input element.
  // this will cause the error below:
  /* InvalidStateError: Failed to set the 'value' property on 'HTMLInputElement'
   * : This input element accepts a filename,
   * which may only be programmatically set to the empty string. */
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value
  return (
    <div className="flex items-center justify-center">
      <FormField
        control={form.control}
        name="image"
        render={({ field: { ref, value, ...rest }, formState }) => (
          <FormItem>
            <FormControl>
              <input
                {...rest}
                type="file"
                hidden
                ref={(e) => {
                  ref(e)
                  selectedFileRef.current = e
                }}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {selectedFile ? (
        <div className="relative h-20 w-20">
          <Image
            src={selectedFile}
            fill
            alt="server image"
            className="rounded-full"
          />
          <button
            type="button"
            onClick={handleRemoveClick}
            className="absolute text-white font-thin
            bg-rose-500 hover:bg-rose-500/80 rounded-full
            px-2 py-0 top-0 right-0 shadow-sm"
          >
            X
          </button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={handleUploadClick}
          className={`h-40 w-40 bg-white text-indigo-500 font-bold
            border-4 border-dashed border-indigo-200
            hover:bg-sky-300/50
          `}
        >
          Upload image
        </Button>
      )}
    </div>
  )
}

export default ImageUpload
