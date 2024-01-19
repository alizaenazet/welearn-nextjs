import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Card } from "@/components/ui/card";
function InstructorPreviewCard({
  imageUrl,
  name,
  location,
  rate,
  reviewerCount,
}: {
  imageUrl: string;
  name: string;
  location: string;
  rate: number;
  reviewerCount: number;
}) {
    var address = location.split(',');
  return (
    <Card className="px-2 py-1 w-full">
    <div className="w-full flex flex-row items-center justify-start gap-3">
      <div className="flex-none h-full items-center justify-center">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </div>
      <RigthSide
        name={name}
        location={address[2] + ", " + address[4]}
        rate={rate}
        reviewerCount={reviewerCount}
      />
    </div>
    </Card>
  );
}

function RigthSide({
  name,
  location,
  rate,
  reviewerCount,
}: {
  name: string;
  location: string;
  rate: number;
  reviewerCount: number;
}) {
  return (
    <div className="flex-1">
      <p className="text-xs font-semibold">{name}</p>
      <p className="text-xs">{location}</p>
      <div className="flex flex-row gap-1 items-center justify-start">
        <p className="text-xs font-normal text-secondary">{rate}</p>
        {Stars({ number: rate })}
        <p className="text-xs font-light text-gray-500">({200})</p> 
      </div>
    </div>
  );
}

function Stars({ number }: { number: number }) {
    let stars : React.JSX.Element[] | undefined[] = []
    for (let index = 0; index < number; index++) {
        
        stars[index] = <Image
        src="/star_rate_icon.svg"
        alt="star rate"
        width={12}
        height={12}
        className="dark:invert"
      />
  }
  return stars
}

export default InstructorPreviewCard;
