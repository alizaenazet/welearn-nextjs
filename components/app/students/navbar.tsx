"use client"
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className='w-full h-fit backdrop-blur-2xl border-gray-300 fixed top-0 left-0 right-0'>
        <div className='w-full h-fit px-2 py-1.5 flex flex-row items-center justify-between'>
                        <Image
                        src="/welearn_letterform.png"
                        alt="apple Logo"
                        className="dark:invert"
                        width={66}
                        height={66}
                        priority
                        />


        <Button variant="outline" size="icon">
                        <Image
                        src="/hamburger_menu_icon.svg"
                        alt="apple Logo"
                        className="dark:invert"
                        width={16}
                        height={16}
                        priority
                        />
        </Button>
        </div>
        <Separator />
    </div>
  )
}

export { Navbar }
