import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import {Navbar} from '@/components/app/students/navbar'
import { authenticateStudent } from '@/lib/firebase/auth'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: 'Home page',
    description: 'Student home page',
  }

export default async function HomePageLayout({
     children,
}: {
  children: React.ReactNode
}) {
  await authenticateStudent()
  

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}