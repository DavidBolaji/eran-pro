import React from "react";
import { Wrapper } from "../wrapper/wrapper";
import { HeroCcard } from "../card/hero-card";
import { HeroRightCard } from "../card/hero-right-card";

export const HeroSection = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-10 gap-4 mt-10 pb-20">
        <div className=" col-span-6">
          <HeroCcard />
        </div>
        <div className="col-span-4">
          <HeroRightCard />
        </div>
      </div>
    </Wrapper>
  );
};
