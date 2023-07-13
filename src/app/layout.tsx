import { NextAuthProvider } from '@/app/providers/auth'
import './globals.css'
import { Inter,Poppins } from 'next/font/google'
import { Header } from "@/app/components/Header";

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'] , weight:["400", "500", "600", "700", "800", "900"]})

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de Reserva de Viagens',
}

export default function RootLayout({ children }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={poppins.className}>
          <NextAuthProvider>
            <Header />
            {children}
          </NextAuthProvider>
        </body>
      </html>
    )
  }
