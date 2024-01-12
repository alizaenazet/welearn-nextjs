
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"





export default function Login() {
    return <div className="flex flex-col justify-center items-center w-screen h-screen px-2">
        <Card>
                
            <CardHeader>
                <div className="w-full flex justify-center items-center">
            <CardTitle>
                <h1 className="text-2xl ">Join WeLearn</h1>
            </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
            <CardDescription>
                <h3 className="pb-5">Email signIn</h3>
            </CardDescription>
                <div className="w-full h-wull flex flex-col items-center gap-3">
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <div className="w-full h-fit flex flex-col justify-start items-start gap-3 pt-2">
                <p className="text-xs text-cyan-500">Forgot your password?</p>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                    </label>
                    </div>
                </div>
                <Button className="w-full" asChild>
                    <p>Login</p>
                </Button>
                <Separator />
                </div>

            </CardContent>

            <CardFooter>
                
                <div className="w-full h-fit flex flex-row items-center justify-center gap-2 pb-3 block">
                    <Button variant="outline" size="icon">
                        <Image
                        src="/apple_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={16}
                        height={16}
                        priority
                        />
                    </Button>

                    <Button variant="outline" size="icon">
                        <Image
                        src="/google_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={16}
                        height={16}
                        priority
                        />
                    </Button>
                </div>
            </CardFooter>
            <div className="flex flex-row w-full items-center justify-center gap-1">
                <p className="text-xs">Don’t have an account?</p>
                <Button className="px-0" variant="link"><p className="text-xs">Sign Up</p></Button>
                </div>
        </Card>


    </div>
}