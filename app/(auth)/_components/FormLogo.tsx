// https://nextjs.org/blog/next-13-5#nextimage-improvements
// https://github.com/pacocoursey/next-themes#images
// https://zenn.dev/crayfisher_zari/articles/51a5add64ef5b7

import Image from 'next/image'
import discordLogoWhite from '@/public/discord-logo-white.svg'
import discordLogoBlack from '@/public/discord-logo-black.svg'

export const FormLogo = () => {
  return (
    <div
      className="hidden md:flex md:flex-col md:w-full md:items-center md:justify-center 
        md:max-w-md md:px-8 md:py-12 md:rounded-tl-lg md:rounded-bl-lg"
    >
      <Image
        src={discordLogoBlack}
        alt="logo"
        width={400}
        height={250}
        priority={true}
      />
      <h1 className="pt-8 text-5xl font-bold">Clone</h1>
    </div>
  )
}
