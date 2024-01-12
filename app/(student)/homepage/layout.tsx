import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import {Navbar} from '@/components/app/students/navbar'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: 'Home page',
    description: 'Student home page',
  }

export default function HomePageLayout({
     children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}