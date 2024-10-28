
"use client"
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { CartButton } from "@/components/button/cart-button";
import { RotateCCWIcon } from "@/constants/icons/rotate-ccw";
import { Grid } from "antd";

import React from "react";
const {useBreakpoint} = Grid
export const LogedIn = () => {
  const LoggedIn = true;
  const screen = useBreakpoint()
  return (
    LoggedIn && (
      <div className="flex items-center gap-4">
       <CartButton />
        <Button
          className="bg-black-600 border-0 md:flex hidden"
          iconL={RotateCCWIcon}
          size={screen.lg ? "lg":"sm"}
          color="light"
        >
          Order History
        </Button>
        <Avatar size="sm" className="md:w-14 md:h-14 w-10 h-10" />
      </div>
    )
  );
};
