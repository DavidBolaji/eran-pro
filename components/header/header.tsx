import React from "react";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Categories } from "./components/categories";
import { LogedIn } from "./components/loged-in";
import { LogedOut } from "./components/loged-out";
import { MenuIcon } from "@/constants/icons/menu";

export const Header = () => {
  return (
    <nav className="h-20 bg-white border-b sticky z-50 top-0">
      <Wrapper>
        <div className="flex h-full items-center justify-between px-4">
          <div className="md:hidden flex items-center">
            <MenuIcon />
          </div>
          <div className="hidden md:flex  items-center px-6 gap-6 h-12 rounded-full border border-black-650 bg-black-700">
            <Categories />
          </div>
          <LogedIn />
          <LogedOut />
        </div>
      </Wrapper>
    </nav>
  );
};
