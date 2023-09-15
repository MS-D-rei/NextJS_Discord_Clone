import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma-client';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied.
        const isCredentialsMissing =
          !credentials?.email || !credentials?.password;
        if (isCredentialsMissing) {
          throw new Error('Please enter your email and password both');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isUserNotFound = !user;
        const isUserRegisteredThroughSocialLogin =
          !!user && !user?.hashedPassword;

        if (isUserNotFound || isUserRegisteredThroughSocialLogin) {
          throw new Error('Incorrect credentials');
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!,
        );

        if (!isPasswordCorrect) {
          throw new Error('Incorrect credentials');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
