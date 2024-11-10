"use client";
import { Button } from "@/components/button/button";
import { LogInIcon } from "@/constants/icons/log-in";
import { UserIcon } from "@/constants/icons/user";
import React from "react";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useUser } from "@/hooks/use-user";
import { CartButton } from "@/components/button/cart-button";

export const LogedOut = () => {
  const { isLoggedIn } = useUser();
  const { toggleModal } = useLoginModal();

  const loginPopup = () => {
    toggleModal(true, "LOGIN_MODAL");
  };

  const registerPopup = () => {
    toggleModal(true, "REGISTER_MODAL");
  };

  return (
    !isLoggedIn() && (
      <div className="flex items-center gap-4">
        <CartButton />
        <Button size="lg" iconL={LogInIcon} color="light" onClick={loginPopup}>
          Sign In
        </Button>
        <Button size="lg" color="dark" iconL={UserIcon} onClick={registerPopup}>
          Create An Account
        </Button>
      </div>
    )
  );
};
