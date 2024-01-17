"use server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase/fbconifg"
import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
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
    
    const auth = getAuth(app)

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

    signInWithEmailAndPassword(auth,email,password)
    .then( async (userCredential) => {
        console.log("sukses");
        const userIdToken = await userCredential.user.getIdToken()

        cookies().set({
            name: '_userIdToken',
            value: userIdToken,
            httpOnly: true
        })
        
        // TODO:(VALIDATE THE USER ROLE)
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log([errorCode,errorMessage]);
      })
      redirect('/homepage') 
}