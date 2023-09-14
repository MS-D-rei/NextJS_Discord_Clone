import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma-client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
