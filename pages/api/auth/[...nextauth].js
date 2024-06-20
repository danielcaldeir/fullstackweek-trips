import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({      
      clientId: process.env.GITHUB_ID,      
      clientSecret: process.env.GITHUB_SECRET,    
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = { 
        ...session.user, 
        id: user.id 
      }; 
      // as { 
      //   id: string; 
      //   name: string; 
      //   email: string;
      //   image: string; 
      // };
      return session;
    },
  },

});