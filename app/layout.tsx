import type { Metadata } from 'next'

import '@/src/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";


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
        
        {children}
      </body>
    </html>
  );
}
