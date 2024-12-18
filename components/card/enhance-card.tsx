
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";

export const EnhanceCard = () => {
  return (
    <div className="relative overflow-hidden w-full py-10 bg-black-600 md:rounded-2xl">
      <div className="px-6">
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="pt- mb-4 black-100 font-bold max-w-xl leading-snug"
        >
          Enhance Your Meal: Perfect <br /> Pairings Just for You!
        </Typography>

        <Typography
          as="p"
          size="s1"
          align="left"
          className="max-w-[516px] mb-[22px] black-100 font-light"
        >
          Complete your order with our handpicked sides and seasonings. Add
          flavourful marinades, fresh veggies, and delicious sauces to elevate
          your cooking experience!
        </Typography>
        <a href="#orders">
          <Button iconR={ArrowUpRightIcon} color="dark" size="lg">
            Shop Now
          </Button>
        </a>
      </div>

      <Image
        className="absolute right-[33px] bottom-[22px] md:block hidden"
        src={Images?.BigLogo}
        alt="right circle"
        width={216}
        height={216}

      />
      <Image
        className="absolute z-10 right-[61px] bottom-[50px] md:block hidden"
        src={Images.CenterMeat}
        alt="right circle"
        width={160}
        height={160}
      />
      <Image
        className="absolute right-[132px] top-[51px] md:block hidden"
        src={Images.BigLogo}
        alt="right circle"
        width={142}
        height={142}
        priority
      />
      <Image
        className="absolute right-[154px] top-[73px] md:block hidden"
        src={Images.LeftMeat}
        alt="right circle"
        width={98}
        height={98}
        priority
      />
      <div className="absolute bottom-0 md:right-[230px] right-[20px] flex gap-6">
        <Image
          className=""
          src={Images.Bottom2}
          alt="right circle"
          width={95}
          height={190}
          priority
        />
        <Image
          className="absolute translate-x-5 translate-y-5"
          src={Images.BreastMeat}
          alt="right circle"
          width={54}
          height={120}
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
        <Image
          className="absolute rotate-180 translate-x-[140px] translate-y-5"
          src={Images.CowMeat}
          alt="right circle"
          width={55}
          height={190}
          priority
        />
      </div>
    </div>
  );
};
