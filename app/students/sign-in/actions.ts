"use server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { z } from 'zod'
import { cookies } from 'next/headers'
import {redirect } from 'next/navigation'
import { auth } from "@/lib/firebase/fbconifg";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

 
const schema = z.object({
    email: z.string({
      invalid_type_error: 'invalid email format',
      required_error: 'email must be required'
    }).min(3),
    password: z.string({
        invalid_type_error: "Invalid password",
        required_error: 'password must be required'
    }).min(2)
  })

  export async function signIn(formData: FormData) {
    console.log("triggered signin");

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }

    const email = `${formData.get('email')}`
    const password = `${formData.get('password')}`
    const isSuccess :boolean = await signInWithEmailAndPassword(auth,email,password)
    .then(async (userCredential) => {
        console.log("sukses");
        const userIdToken = await userCredential.user.getIdToken()
        
        console.log(["login berhasil",userCredential]);
        
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await createSessionCookie(userIdToken, { expiresIn });
        cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

         return true
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log([errorCode,errorMessage]);
        return false
      })

      if (isSuccess) {
        redirect('/homepage')
      }
}