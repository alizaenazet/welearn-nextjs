import React from 'react'
import { LessonCard } from '@/components/app/students/lessonCard'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  
return (
    <div className='pt-14 flex flex-col w-full items-start gap-2 px-2'>
        <div>
            <p className='text-lg font-medium pb-2'>My learning</p>
            <ScrollArea className="w-96 whitespace-nowrap rounded-md border px-2">
            <Button variant="ghost">All</Button>
            <Button variant="ghost">Ongoing</Button>
            <Button variant="ghost">Finished</Button>
            <Button variant="ghost">Rates</Button>
            <Button variant="ghost">Favorited</Button>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
        <LessonCard/>
    </div>
  )
}
