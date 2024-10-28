import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";
import { Images } from "@/constants/image";
import Image from "next/image";

export const FreshMeatCard = () => {
  return (
    <div className="bg-white h-[347px] overflow-hidden md:rounded-2xl px-6 py-8 relative">
      <Typography
        as="h4"
        size="h4"
        align="left"
        className="pb-4 max-w-[395px] font-bold leading-tight black-100"
      >
        Fresh, Expertly <br /> Handled Meat You Can Trust 🥩
      </Typography>
      <Typography as="p" size="s1" align="left" className="pb-4 max-w-[394px] black-100">
        Our meats are expertly selected and prepared to ensure top quality and
        freshness. From farm to table, we prioritize safety and flavor in every
        cut!
      </Typography>
      <Button iconR={ArrowUpRightIcon} color="light" size="lg">
        Shop Now
      </Button>
      <Image
        src={Images.Side3}
        alt="svgicon"
        priority
        width={100}
        height={199}
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};
