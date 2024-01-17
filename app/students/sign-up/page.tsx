"use client";
import React, { useState } from "react";
import { useFormState } from 'react-dom';
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { PasswordInput } from "@/components/app/features/input/passwordInput";
import { useFormStatus } from 'react-dom'

import { studentRegister,studentDobPassword } from "./actions";


const initialState = {
    message: '',
    stateMessages: [],
  }

export default function SignUp() {
  const [dob, setDOB] = React.useState<Date>();
  const [password, setPassword] = useState("");
  const { pending } = useFormStatus()
  const { toast } = useToast()
  const [state, formAction] = useFormState(studentRegister, initialState)
    
  return (
    <div className="w-screen h-full flex flex-col items-center justify-center gap-7 px-9 py-12">
      <h1 className="text-xl font-semibold">Student Sign Up</h1>
      <p aria-live="polite" className="sr-only">
        {state?.message.toString()}
      </p>
      {/* {state?.stateMessages && Object.entries(state.stateMessages)
      .forEach(([key, value]) => {
        setTimeout(()=> toast({
            title: key,
            description: `${value}`
        }),2000)
      })} */}
      <form id="studentRegisterForm" action={formAction} method="POST"  className="w-full h-fit flex flex-col justify-start items-center gap-2">
        <div className="w-full flex flex-row gap-2">
          <Input
            placeholder="First name"
            className="flex-1"
            type="text"
            name="firstName"
            required
          />
          <Input
            placeholder="Last name"
            className="flex-1"
            type="text"
            name="lastName"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dob && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dob ? format(dob, "PPP") : <span>Date of birth</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dob}
              onSelect={setDOB}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Email"
          className="flex-1"
          type="email"
          name="email"
          required
        />
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="password"
        />
        <Input
          placeholder="Street number"
          type="text"
          name="streetNumber"
          required
        />
        <div className="w-full flex flex-row items-center justify-start gap-1 ">
          <p className="text-2xl font-normal">+</p>
          <Input
            placeholder="62.."
            className="w-14"
            type="text"
            name="phoneCode"
            required
          />
          <Input
            placeholder="Phone number"
            className="w-full"
            type="phone"
            name="phoneNumber"
            required
          />
        </div>

        <Input
          placeholder="Route"
          type="text"
          name="route"
          required
          className="mt-4"
        />
        <Input
          placeholder="Postal Code"
          type="number"
          name="postalCode"
          required
        />
        <Input
          placeholder="Administrative area"
          type="text"
          name="administrativeArea"
          required
        />
        <Input 
            placeholder="Locality" 
            type="text" 
            name="locality" 
            required 
        />
        <input type="hidden" name="dob" value={dob ? dob.toISOString() : ""  } />
        <input type="hidden" name="password" value={password} />

      </form>
      
      <div className="w-full flex flex-col flex-wrap gap-3 ">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label className="font-normal text-xs" htmlFor="terms">
            Accept terms and conditions
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" />
          <Label className="font-normal text-xs" htmlFor="terms">
            I accept to WeLearn’s use of my data for the service and everything
            else described in the Privacy Policy and Data Processing Agreement
          </Label>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between items-center ">
        <a href="/students/sign-in">
        <Button variant="link">Sign in instead</Button>
        </a>
        {/* <Button  className="text-sm">  */}
        <button form="studentRegisterForm" type="submit">Create account</button> 
        {/* </Button> */}
      </div>
    </div>
  );
}
