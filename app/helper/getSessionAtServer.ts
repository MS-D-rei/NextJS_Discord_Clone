import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth-options';

// This is a Helper function to get session without passing config every time
// From: https://github.com/nextauthjs/next-auth-example/blob/main/auth.ts
// Ref: https://next-auth.js.org/configuration/nextjs#getserversession

export const getSessionAtServer = async (
  ...args: [NextApiRequest, NextApiResponse] | []
) => {
  return await getServerSession(...args, authOptions);
};
