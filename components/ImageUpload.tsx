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
  const form: UseFormReturn<
    { serverName: string; serverImage: string },
    any,
    undefined
  > = useFormContext()

  const handleUploadClick = () => {
    selectedFileRef.current?.click()
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
        form.setValue('serverImage', readerEvent.target.result as string)
      }
    }
  }

  const handleRemoveClick = () => {
    setSelectedFile('')
    form.setValue('serverImage', '')
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
        name="serverImage"
        render={({ field: { ref, onChange, value, ...rest }, formState }) => (
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
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={selectedFile}
            width={200}
            height={200}
            alt="server image"
          />
          <Button type="button" onClick={handleRemoveClick}>
            Remove
          </Button>
        </div>
      ) : (
        <div>
          <Button type="button" onClick={handleUploadClick}>
            Upload
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
