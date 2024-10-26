// import { Images } from "@/constants/image";
// import Image from "next/image";
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";

export const HeroCcard = () => {
  return (
    <div className="relative w-full py-10 bg-black-630 rounded-2xl">
      <div className="px-6">
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="pt- mb-4 text-black-100 font-bold max-w-xl "
        >
          Get 15% Off All Chicken Orders <br />
          <span className="bg-black-630 px-4 ml-5 relative z-10">One Day Only! 🐔</span>
          <hr className="bg-black-100 h-1 -translate-y-7 -z-10 w-10/12" />
        </Typography>

        <Typography
          as="p"
          size="s1"
          align="left"
          className="max-w-[516px] mb-[22px]"
        >
          This 19th October, enjoy fresh, premium chicken delivered to your
          doorstep at a discount. Don&apos;t miss out – order now and savor the
          savings!
        </Typography>
        <Button color="dark" size="lg">
          Make an Order Now
        </Button>
      </div>

      <Image
        className="absolute right-0 bottom-1/4"
        src={Images.Right}
        alt="right circle"
        width={95}
        height={190}
        priority
      />
      <div className="absolute bottom-0 right-6 flex gap-6">
        <Image
          className=""
          src={Images.Bottom2}
          alt="right circle"
          width={95}
          height={190}
          priority
        />
        <Image
          className=""
          src={Images.Bottom}
          alt="right circle"
          width={95}
          height={190}
          priority
        />
      </div>
    </div>
  );
};
