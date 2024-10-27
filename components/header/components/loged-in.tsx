
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { CartButton } from "@/components/button/cart-button";
import { RotateCCWIcon } from "@/constants/icons/rotate-ccw";

import React from "react";

export const LogedIn = () => {
  const LoggedIn = true;
  return (
    LoggedIn && (
      <div className="flex items-center gap-4">
       <CartButton />
        <Button
          className="bg-black-610 border-0"
          iconL={RotateCCWIcon}
          size="lg"
          color="light"
        >
          Order History
        </Button>
        <Avatar size="lg" />
      </div>
    )
  );
};
