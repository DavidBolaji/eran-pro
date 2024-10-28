import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";

export const FoodCard = () => {
  return (
    <div className="bg-gradient-to-b min-w-[213px] from-[#23342A] to-[#7DBA00] h-[347px] flex flex-col items-center justify-center rounded-2xl relative">
      <div className="flex items-center justify-center border border-white bg-transparent w-[94px] h-[94px] rounded-full mb-1.5">
        <div className="w-[74px] h-[74px] rounded-full bg-white" />
      </div>
      <Typography
        as="h6"
        size="h6"
        align="center"
        className="black-600 mb-2 px-4"
      >
        Cow Meat
      </Typography>
      <Typography
        as="h6"
        size="h6"
        align="center"
        className="black-600 font-medium leading-[22px] text-sm mb-6 px-4"
      >
        Premium cow meat cuts for every meal.
      </Typography>
      <Button
        color="light"
        size="lg"
        className="border-0 bg-black-600 black-100 text-[14px] font-normal black-100"
      >
        Shop Now
      </Button>
      <Image
        src={Images.Top}
        width={67}
        height={136}
        alt="card svg"
        className="absolute right-1/3 top-0"
      />
    </div>
  );
};
