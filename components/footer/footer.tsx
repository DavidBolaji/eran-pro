import { Images } from "@/constants/image";
import Image from "next/image";
import React from "react";
import { Typography } from "../typography/typography";
import { Wrapper } from "../wrapper/wrapper";
import { footerNav } from "@/utils/data";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="pt-16 bg-white md:px-0">
      <Wrapper>
        <div className="px-4">
          <Image
            priority
            src={Images.BlackLogo}
            alt="EranPro logo"
            width={120}
            height={40}
            className="mb-2"
          />
          <Typography
            className="black-200 mb-7 black-200"
            align="left"
            as="p"
            size="s1"
          >
            Fresh Meat Delivered: Quality Cuts, Exceptional Taste!
          </Typography>
          <div className="grid md:grid-cols-10 grid-cols-2 gap-x-4">
            {footerNav.map((foot) => (
              <div key={foot.title} className="col-span-2 md:mb-0 mb-10">
                <Typography
                  size="h6"
                  as="h6"
                  align="left"
                  className="pb-2 font-bold text-[20px] black-100"
                >
                  {foot.title}
                </Typography>
                {foot.navs.map((nav) => (
                  <Typography
                    key={nav.name}
                    align="left"
                    size="s2"
                    as="p"
                    className="text-[16px] font-light leading-5 pb-4 black-100"
                  >
                    {nav.name}
                  </Typography>
                ))}
                {typeof foot?.socials !== "undefined" && (
                  <div className="flex gap-8 md:ml-0 -ml-1 mt-5 md:mb-0">
                    {foot.socials.map((social, index) => (
                      <span key={index}>{social.icon}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
      <div className="bg-grey-200 py-8 md:px-20 px-4">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="black-300 font-bold text-sm md:mb-0 mb-4">
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
