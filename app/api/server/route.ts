import { NextResponse } from 'next/server'
import { createId } from '@paralleldrive/cuid2'

import prismaClient from '@/lib/prisma-client'
import { getCurrentUserAtServer } from '@/app/_actions/getCurrentUserAtServer'
import { MemberRole } from '@prisma/client'

export async function POST(request: Request) {
  try {
    // check whether user is authorized
    const currentUser = await getCurrentUserAtServer()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // check whether request body is valid
    const { name, image } = await request.json()

    const server = await prismaClient.server.create({
      data: {
        name,
        image,
        userId: currentUser.id,
        invideCode: createId(),
        channels: {
          create: [
            {
              name: 'general',
              userId: currentUser.id,
            },
          ],
        },
        members: {
          create: [
            {
              userId: currentUser.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    })

    console.log(server)

    return NextResponse.json(server)
  } catch (err) {
    console.error(err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
