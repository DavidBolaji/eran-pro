import React from "react";
import { Wrapper } from "../wrapper/wrapper";
import { HeroCcard } from "../card/hero-card";
import { HeroRightCard } from "../card/hero-right-card";

export const HeroSection = () => {
  return (
    <Wrapper>
      <div className="grid md:grid-cols-10 grid-cols-6 gap-4 md:mt-10 md:pb-20 pb-12">
        <div className="col-span-6 ">
          <HeroCcard />
        </div>
        <div className="md:col-span-4 col-span-6 md:px-0 md:mt-0 mt-6 px-4">
          <HeroRightCard />
        </div>
      </div>
    </Wrapper>
  );
};
