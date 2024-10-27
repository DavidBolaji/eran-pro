import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";

export const HeroRightCard = () => {
  return (
    <div className="bg-black-100 rounded-2xl py-10 px-6 relative overflow-hidden">
      <Typography
        as="h4"
        size="h4"
        align="left"
        className="text-white pb-4 max-w-[394px]"
      >
        Explore Our Fresh <br /> Meat Selection 🍖
      </Typography>
      <Typography
        as="p"
        size="s1"
        align="left"
        className="pb-7 text-white max-w-[266px]"
      >
        From whole chicken to gizzard to briskets and cow tail, we&apos;ve got
        all your favourites.
      </Typography>
      <Button className="bg-black-610 text-black-100" size="lg" color="light">
        Explore Categories
      </Button>
      <Image
        className="absolute right-0 top-8"
        src={Images.Right2}
        alt="right circle"
        width={53}
        height={106}
        priority
      />
      <Image
        className="absolute right-0 top-52"
        src={Images.Box}
        alt="right circle"
        width={120}
        height={190}
        priority
      />
      <Image
        className="absolute right-4 top-64"
        src={Images.Briefcase}
        alt="right circle"
        width={63}
        height={60}
        priority
      />
    </div>
  );
};
