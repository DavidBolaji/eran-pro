import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { RotateCCWIcon } from "@/constants/icons/rotate-ccw";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import React from "react";
import { CartCount } from "./cart-count";

export const LogedIn = () => {
  const LoggedIn = true;
  return (
    LoggedIn && (
      <div className="flex items-center gap-4">
        <Button
          iconL={ShoppingCartIcon}
          className="bg-black-610 border-0"
          iconR={() => <CartCount />}
          size="lg"
          color="light"
        >
          Cart
        </Button>
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
