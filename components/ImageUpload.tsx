import { ChangeEvent, ComponentPropsWithRef, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploadProps extends ComponentPropsWithRef<'div'> {
  selectedFile?: string
  setSelectedFile: (value: string) => void
  handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  handleUploadImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    selectedFileRef.current?.click()
  }

  const handleRemoveClick = () => {
    setSelectedFile('')
  }

  return (
    <div className="flex items-center justify-center">
      {selectedFile ? (
        <div>
          <Image
            src={selectedFile}
            width={400}
            height={400}
            alt="server image"
          />
          <Button onClick={handleRemoveClick}>Remove</Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleUploadClick}>Upload</Button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden={true}
            onChange={handleUploadImage}
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
