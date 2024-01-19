"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import React from "react";
import { Separator } from "@/components/ui/separator";

const LessonCard = ({
  name,
  instructorName,
  price,
  imageUrl,
  methods
}: {
  name: string;
  instructorName: string;
  price: number;
  imageUrl: string;
  methods: string[]
}) => {
  return <Card className="py-2 p-3 w-full">
      <div className="w-full h-fit flex flex-row gap-2 items-center">
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
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-sm">{instructorName}</p>
          <Separator className="my-0.5" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="text-xs">{methods[0]}</div>
        <Separator orientation="vertical" />
        { methods[1] && <>
          <div className="text-xs">{methods[1]}</div> 
         <Separator orientation="vertical" />
        </>
        }
      </div>
          <Badge >
            $ {price}
          </Badge>
        </div>
      </div>
    </Card>
};

export { LessonCard };
