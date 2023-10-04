'use server'

import { cookies } from 'next/headers'

export const setTheme = async (theme: string) => {
  cookies().set('theme', theme)
  console.log('setTheme', theme)
}
