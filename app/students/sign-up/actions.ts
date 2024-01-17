'use server';

import { z } from 'zod'
import {phone} from 'phone';
import axios from 'axios';
import { isoDateTimeToDateString } from '@/lib/utils';
import { redirect } from 'next/navigation';

const dobPasswordSchema = z.object({
    dob: z.date({
        invalid_type_error: "invalid date format",
        required_error: "DOB must be required"
    }),
    password: z.string({
        invalid_type_error: "password must be string",
        required_error: "password must be required"
    }).min(8, "password mustbe more 8 char ")
})

export type studentDobPassword = z.infer<typeof dobPasswordSchema>

const schema = z.object({
    firstName: z.string({
        invalid_type_error: 'username must be required',
        required_error: 'username must be required'
    }),
    lastName: z.string({
        invalid_type_error: 'last name must be a text'
    }).nullable(),
    
    email: z.string({
        invalid_type_error: 'invalid email format',
        required_error: 'email must be required'
      }).min(3),
      password: z.string({
          invalid_type_error: "Invalid password",
          required_error: 'password must be required'
      }).min(8),
      streetNumber: z.string({
        invalid_type_error: 'street numb must be an string',
        required_error: "street number must be required"
      }),
      phoneCode: z.string({
        invalid_type_error: 'phone number must be an string',
        required_error: "phone must be required"
      }).max(6,'invalid phone code'),
      phoneNumber: z.string({
        invalid_type_error: 'phone number must be an string',
        required_error: "phone must be required"
      }),
      route: z.string({
        invalid_type_error: 'route must be an string',
        required_error: "route must be required"
      }),
      postalCode: z.string({
        invalid_type_error: 'postal Code must be an string',
        required_error: "postal Code must be required"
      }),
      administrativeArea: z.string({
        invalid_type_error: 'administrativeArea must be an string',
        required_error: "administrativeArea must be required"
      }),
      locality: z.string({
        invalid_type_error: 'administrativeArea must be an string',
        required_error: "administrativeArea must be required"
      }),
      dob: z.string().datetime()
})

export async function studentRegister (prevState: any, formData: FormData) {
    console.log("register triggered");
    
    const validatedFields = schema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        streetNumber: formData.get('streetNumber'),
        phoneCode: formData.get('phoneCode'),
        phoneNumber: formData.get('phoneNumber'),
        route: formData.get('route'),
        postalCode: formData.get('postalCode'),
        administrativeArea: formData.get('administrativeArea'),
        locality: formData.get('locality'),
        dob: formData.get('dob')
    })

    if (!validatedFields.success) {
    console.log(["register failed", validatedFields.error.flatten().fieldErrors,formData.get('dob')]);
        return {
            message: validatedFields.error.flatten().fieldErrors,
          }
    }

    const phoneNumberValidator = phone(`+${validatedFields.data.phoneCode}${validatedFields.data.phoneNumber}`)
    if (!phoneNumberValidator.isValid) {
        return {
            message: "invalid phone number"
        }
    }
    
    const form = validatedFields.data
    const username = form.firstName
    form.lastName && username + ` ${form.lastName}`
    const apiBaseUrl = process.env.API_ENDPOINT
    console.log(['base url', apiBaseUrl]);
    
    axios.post(apiBaseUrl+'/students/register',
        {
            username: username,
            email: form.email,
            password: form.password,
            phone: phoneNumberValidator.phoneNumber,
            DOB: isoDateTimeToDateString(form.dob),
            address: {
                street_number: Number(form.streetNumber),
                route: form.route,
                postal_code: Number(form.postalCode),
                locality: form.locality,
                administrative_area_level_1: form.administrativeArea,
            }
        }).then((response) => {
            const {data,status} = response;
            console.log(["request sukses",data]);
            
            if (status == 400) {
                return {
                    message: "invalid form register",
                    stateMessages: data
                }
            }
            console.log(["sukses",data,status]);
        }).catch((error) =>{
            console.log(["request error",error]);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return {
                    message: error.response.status,
                    // stateMessages: error.response.data
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                return {
                    message: "create failed"
                }
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            return {
                message: "something wrong"
            }
        })

        //  TODO: Make verify role when redirect on student homepage
        console.log(["register end", validatedFields.data,formData.get('dob')]);
        redirect('/students/sign-in')
}
