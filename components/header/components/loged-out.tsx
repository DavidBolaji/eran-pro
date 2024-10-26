import { Button } from "@/components/button/button";
import { LogInIcon } from "@/constants/icons/log-in";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { UserIcon } from "@/constants/icons/user";
import React from "react";
import { CartCount } from "./cart-count";

export const LogedOut = () => {
  const LoggedIn = true;
  return (
    !LoggedIn && (
      <div className="flex items-center gap-4">
        <Button
          size="lg"
          iconL={ShoppingCartIcon}
          iconR={() => <CartCount />}
          className="bg-black-650 border-0"
          color="light"
        >
          Cart
        </Button>
        <Button size="lg" iconL={LogInIcon} color="light">
          Sign In
        </Button>
        <Button size="lg" color="dark" iconL={UserIcon}>
          Create An Account
        </Button>
      </div>
    )
  );
};
