import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import { authenticateStudent } from '@/lib/firebase/auth'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'
import { redirect } from "next/navigation";



const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Student Sign in',
  }

export default async function HomePageLayout({
     children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
    if (currentUser) {
        if (currentUser.customClaims!.isInstructor) {
            redirect("/dashboard");
        }else{
            redirect("/homepage");
        }
    }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}