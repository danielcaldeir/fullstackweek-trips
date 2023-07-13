import NextAuth, { AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from 'next-auth/adapters';
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    // Configure one or more authentication providers  
    providers: [    
        GithubProvider({      
            clientId: process.env.GITHUB_ID,      
            clientSecret: process.env.GITHUB_SECRET,    
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });