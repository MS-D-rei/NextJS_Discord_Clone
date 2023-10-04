'use server'

import { cookies } from 'next/headers'

export const getTheme = async () => {
  console.log('getTheme', cookies().get('theme')?.value ?? 'dark')
  return cookies().get('theme')?.value ?? 'dark'
}
