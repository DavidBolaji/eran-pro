
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import Image from "next/image";
import { Images } from "@/constants/image";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";

export const EnhanceCard = () => {
  return (
    <div className="relative w-full py-10 bg-black-610 rounded-2xl mb-20">
      <div className="px-6">
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="pt- mb-4 text-black-100 font-bold max-w-xl leading-snug"
        >
          Enhance Your Meal: Perfect <br /> Pairings Just for You!
        </Typography>

        <Typography
          as="p"
          size="s1"
          align="left"
          className="max-w-[516px] mb-[22px]"
        >
          Complete your order with our handpicked sides and seasonings. Add
          flavourful marinades, fresh veggies, and delicious sauces to elevate
          your cooking experience!
        </Typography>
        <Button iconR={ArrowUpRightIcon} color="dark" size="lg">
          Shop Now
        </Button>
      </div>

      <Image
        className="absolute right-[33px] bottom-[22px]"
        src={Images.Big}
        alt="right circle"
        width={216}
        height={216}
        priority
      />
      <Image
        className="absolute z-10 right-[61px] bottom-[50px]"
        src={Images.Black}
        alt="right circle"
        width={160}
        height={160}
        priority
      />
      <Image
        className="absolute right-[132px] top-[51px]"
        src={Images.Big}
        alt="right circle"
        width={142}
        height={142}
        priority
      />
      <Image
        className="absolute right-[154px] top-[73px]"
        src={Images.Black}
        alt="right circle"
        width={98}
        height={98}
        priority
      />
      <div className="absolute bottom-0 right-[230px] flex gap-6">
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
