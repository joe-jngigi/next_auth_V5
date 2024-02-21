import type { Metadata } from 'next'

import '@/src/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { data_base } from '@/src/lib/prisma-db';


export const metadata: Metadata = {
  title: 'VIRGO | Next Auth',
  description: 'Work on next-Auth v5; and working with admins',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className="font-poppins !scroll-smooth">
        <ToastContainer draggable position="bottom-right" />

        {children}
      </body>
    </html>
  );
}
