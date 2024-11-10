import { Images } from "@/constants/image";
import Image from "next/image";
import React from "react";

export const LeftMeatSection = () => {
  return (
    <div className="relative">
      <Image
        src={Images.LeftMeat}
        alt="meat"
        width={126}
        height={126}
        priority
        className="absolute -mt-2 ml-[42px]"
      />
      <div className="relative lg:z-10">
        <Image
          src={Images.CenterMeat}
          alt="meat"
          width={192}
          height={192}
          priority
          className="ml-[109px] mt-5"
        />
      </div>
      <Image
        src={Images.BottomMeat}
        alt="meat"
        width={119}
        height={119}
        priority
        className="ml-[169px] -bottom-24 z-10 absolute lg:block hidden"
      />
    </div>
  );
};
