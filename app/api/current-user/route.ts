import { getCurrentUser } from "@/lib/firebase/firebase-admin"

export async function GET() {

    const user = await getCurrentUser()
    return Response.json({ user })
  }