'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import Image from "next/image"

  import React from 'react'
  
  const  LessonCard = (
    // imageLink: string = "https://source.unsplash.com/800x800/?learn",
    // lessonName: string = "Piano klasik",
    // instructorName: string = "budi anton",
    // categoryName: string = "music",
    // rateNumber: number = 3,
    // studentCount: number = 120,
    // price: number = 84
  ) => {
    
    const stars = () => {
        const tempItems = []
        for (let index = 0; index < 3; index++) {
               tempItems.push( 
               <Image
                src="/hamburger_menu_icon.svg"
                alt="apple Logo"
                className="dark:invert"
                width={12}
                height={12}
                priority
                />
                )
            }
            return tempItems
    }
    
    return <Card className="py-2 p-3 w-full">
                    <div className="w-full h-fit flex flex-row gap-2 items-center" >

                    <div className="flex-none ">
                    <Image
                        src={"https://source.unsplash.com/800x800/?learn"}
                        alt="lesson image"
                        className="dark:invert"
                        width={104}
                        height={104}
                        priority
                        />
                    </div>

                    <div className="flex-initial w-full gap-2">
                        <p className="text-base font-semibold" >{"belajar piano"}</p>
                        <p className="text-sm" >{"budi anton"}</p>
                        <Badge variant="outline">Music</Badge>
                        <div className="flex flex-row gap-[1px]">
                        <p className="text-xs" >{"4.6"}</p>
                        <Image
                        src="/star_rate_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={12}
                        height={12}
                        priority
                        />
                        <Image
                        src="/star_rate_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={12}
                        height={12}
                        priority
                        />
                        <Image
                        src="/star_rate_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={12}
                        height={12}
                        priority
                        />
                        <p className="text-xs" >{`(${"122"})`}</p>
                        </div>
                        <p className="text-sm" >{`$${300}`}</p>
                    </div>

                    </div>
            </Card>
  }
  
  export { LessonCard }