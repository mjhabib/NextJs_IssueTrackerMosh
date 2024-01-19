import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
// import google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@root/prisma/client';

const GITHUB_CLIENT_ID = process.env.GITHUB_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET;

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;

if (
  !GITHUB_CLIENT_ID ||
  !GITHUB_CLIENT_SECRET
  // ||
  // !GOOGLE_CLIENT_ID ||
  // !GOOGLE_CLIENT_SECRET
) {
  throw new Error('Missing OAuth Credentials');
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    // google({
    //   clientId: GOOGLE_CLIENT_ID,
    //   clientSecret: GOOGLE_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    // Usually not needed, here we are fixing a bug in next-auth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  trustHost: true,
  // Necessary to test this web-app in an unsecure network (i.e. localhost) without getting any errors during production mode (npm run build, npm run start)
});

