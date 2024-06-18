import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Poppins } from "next/font/google";
import React, { ReactNode } from "react";

const poppins = Poppins({ subsets: ['latin'] , weight:["400", "500", "600", "700", "800", "900"]})

const metadata = {
  title: 'About',
  description: 'Sistema de Reserva de Viagens',
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
        <body className={poppins.className}>
            <div className='flex flex-col h-screen'>
              <div className="h-[94px]">
                <Header />
              </div>
              <div className="flex-1">
                <h2>About Layout</h2>
                {children}
              </div>
              <Footer />
            </div>
        </body>
      </html>
  );
};

export default Layout;