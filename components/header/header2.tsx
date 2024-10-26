import React from "react";
import { Wrapper } from "../wrapper/wrapper";
import Image from "next/image";
import { Images } from "@/constants/image";
import { Typography } from "../typography/typography";
import { ICON } from "@/constants/icon";

export const Header2 = () => {
  return (
    <div className="h-20 bg-grey-200">
      <Wrapper>
        <div className="grid grid-cols-10 items-center h-full">
          <div className="col-span-2">
            <Image
              priority
              src={Images.BlackLogo}
              alt="EranPro logo"
              width={120}
              height={40}
            />
          </div>
          <div className="col-span-6">
            <Typography 
            className="text-black-100"
            align="center" as="p" size="s2">
              Delivery between 10:00am to 5:00pm Monday to Saturday in Lagos,
              Ibadan and Abuja
            </Typography>
          </div>
          <div className="col-span-2 pl-1">
            <div className="flex gap-2 items-center">
              <ICON.whatsappIcon />
              <Typography
              className="text-black-300 text-nowrap"
              align="center" as="p" size="s2">
              Get in touch on WhatsApp
            </Typography>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
