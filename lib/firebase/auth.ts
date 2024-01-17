'use server'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";
import { auth } from "./fbconifg";
import { cookies } from "next/headers";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = await response.json();
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut(isInstructor: boolean) {
  try {
    const sessionCookie = cookies().get("__session")?.value;

    if (sessionCookie) {
      cookies().delete("__session");
      if (await revokeAllSessions(sessionCookie)) {
        isInstructor? redirect('/instructors/sign-in') : redirect('/students/sign-in')
      }

    }
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}

export async function authenticateStudent() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/students/sign-in");
  }
  if (currentUser.customClaims!.isInstructor) {
    redirect("/dashboard");
  }
  return currentUser;
}
export async function authenticateInstructor() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/instructors/sign-in");
  }
  if (currentUser.customClaims!.isInstructor == false) {
    redirect("/homepage");
  }
  return currentUser;
}
