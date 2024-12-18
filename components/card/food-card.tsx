import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";

export const FoodCard = () => {
  return (
    <div className="bg-gradient-to-b min-w-[213px] from-[#23342A] to-[#7DBA00] overflow-hidden h-[347px] flex flex-col items-center justify-center rounded-2xl relative">
      <div className="flex items-center justify-center border border-white bg-transparent w-[22px] h-[22px] rounded-full mb-1.5">
        <div className="w-[18px] h-[18px] rounded-full bg-white" />
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
        className="border-0 bg-black-600 black-100 text-[14px] font-bold black-100"
      >
        Shop Now
      </Button>
      <div className="absolute top-0">
        <Image
          src={Images.Top}
          width={105}
          height={105}
          alt="card svg"
          className=""
        />

      </div>
      <div className="absolute top-0 -translate-y-7">
        <Image
          src={Images.BottomMeat}
          width={59}
          height={79}
          alt="card svg"
          className=""
        />

      </div>
    </div>
  );
};
