import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prismaClient from '@/libs/prisma-client'

console.log('Registering user started')
performance.mark('register-start')

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, password } = body

    const isCredentialsMissing = !name || !email || !password
    if (isCredentialsMissing) {
      return new NextResponse('Missing credentials', { status: 400 })
    }

    const SALT_ROUNDS = 12
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (err) {
    console.log(`REGISTER ERROR: ${err}`)
    return new NextResponse('Internal error', { status: 500 })
  }
}

performance.mark('register-end')

performance.measure('register', 'register-start', 'register-end')
const result = performance.getEntriesByName('register')[0]
console.log(`Registering user ended - took ${result.duration}ms`)
