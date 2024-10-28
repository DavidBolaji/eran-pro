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
        <div className="grid grid-cols-10 items-center h-full lg:px-0 md:px-4">
          <div className="col-span-2 md:px-0 pl-4">
            <Image
              priority
              src={Images.BlackLogo}
              alt="EranPro logo"
              width={120}
              height={40}
            />
          </div>
          <div className="col-span-6 md:block hidden">
            <Typography 
            className="black-100"
            align="center" as="p" size="s2">
              Delivery between 10:00am to 5:00pm Monday to Saturday in Lagos,
              Ibadan and Abuja
            </Typography>
          </div>
          <div className="col-span-2 pl-1 md:block hidden">
            <div className="flex gap-2 items-center">
              <ICON.whatsappIcon />
              <Typography
              className="black-300 text-nowrap"
              align="center" as="p" size="s2">
              Get in touch on WhatsApp
            </Typography>
            </div>
          </div>
          <div className="md:hidden col-span-8 justify-end flex pr-4">
            <ICON.whatsapppIcon />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
