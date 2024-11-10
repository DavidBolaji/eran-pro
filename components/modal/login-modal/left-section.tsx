import { Typography } from "@/components/typography/typography";
import { Images } from "@/constants/image";
import Image from "next/image";
import React from "react";
import { LeftMeatSection } from "./left-meat-section";

export const LeftSection = () => {
  return (
    <div className="col-span-6 bg-black-600">
      <div className="flex flex-col -translate-y-14 pl-8 h-[600px] items-start justify-center w-full">
        <div className="mb-2">
          <Image
            priority
            src={Images.BlackLogo}
            alt="logo"
            width={120}
            height={40}
          />
        </div>
        <Typography
          align="left"
          size="s1"
          as="p"
          className="font-medium text-xs mb-9"
        >
          Fresh Meat Delivered: Quality Cuts, Exceptional Taste!
        </Typography>
        <LeftMeatSection />
      </div>
    </div>
  );
};
