'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { signIn, signOut , useSession} from 'next-auth/react'

export default function Home() {
    const { data:session } = useSession();
    if (session){
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>Home Pages</h1>
                <div> Ola, {session.user?.name}</div>
                <pre><img src='{session.user?.image}'></img> </pre>
                <div>E-Mail: {session.user?.email}</div>
                <div>
                    <button onClick={() => signOut()}>Sair</button>
                </div>

                

                
            </main>
        );
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Pages</h1>
      <div>
        <button onClick={() => signIn('google')}>Login</button>
      </div>

      

      
    </main>
  )
}
