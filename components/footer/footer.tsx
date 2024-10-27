import { Images } from "@/constants/image";
import Image from "next/image";
import React from "react";
import { Typography } from "../typography/typography";
import { Wrapper } from "../wrapper/wrapper";
import { footerNav } from "@/utils/data";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="pt-16 bg-white">
      <Wrapper>
        <Image
          priority
          src={Images.BlackLogo}
          alt="EranPro logo"
          width={120}
          height={40}
          className="mb-2"
        />
        <Typography
          className="text-black-200 mb-7"
          align="left"
          as="p"
          size="s1"
        >
          Fresh Meat Delivered: Quality Cuts, Exceptional Taste!
        </Typography>
        <div className="grid grid-cols-10 gap-x-4">
          {footerNav.map((foot) => (
            <div key={foot.title} className="col-span-2">
              <Typography
                size="h6"
                as="h6"
                align="left"
                className="pb-2 font-bold"
              >
                {foot.title}
              </Typography>
              {foot.navs.map((nav) => (
                <Typography
                  key={nav.name}
                  align="left"
                  size="s1"
                  as="p"
                  className="font-normal text-base pb-5 leading-5"
                >
                  {nav.name}
                </Typography>
              ))}
              {typeof foot?.socials !== "undefined" && (
                <div className="flex gap-8 mt-5">
                  {foot.socials.map((social, index) => (
                    <span key={index}>{social.icon}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Wrapper>
      <div className=" bg-grey-200 py-8 px-20">
        <div className="flex justify-between items-center">
          <div className="text-black-300 font-bold text-sm">
            Copyright © {new Date().getFullYear()} EranPro. All right reserved
          </div>
          <div className="flex items-center gap-x-4">
            <Link href={"#"} className="font-bold font-satoshi text-sm">
              Cookie Policy
            </Link>
            <Link href={"#"} className="font-bold font-satoshi text-sm">
              Terms of Service
            </Link>
            <Link href={"#"} className="font-bold font-satoshi text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
