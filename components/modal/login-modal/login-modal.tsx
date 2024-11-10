"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import React from "react";
import { StyledModalDrawer, StyledModalMobileDrawer } from "../modal.style";
import { AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/constants/icons/close";
import { LeftSection } from "./left-section";
import { LoginSection } from "./login-section";
import { RegisterSection } from "./register-section";
import { Grid } from "antd";
import Image from "next/image";
import { Images } from "@/constants/image";
import { Typography } from "@/components/typography/typography";
import { LeftMeatSection } from "./left-meat-section";
import { LoginSectionMobile } from "./login-section-mobile";
const { useBreakpoint } = Grid;

export const LoginModal = () => {
  const { loginModal, toggleModal } = useLoginModal();
  const screen = useBreakpoint();

  const loginPopup = () => {
    toggleModal(true, "LOGIN_MODAL");
  };

  const registerPopup = () => {
    toggleModal(true, "REGISTER_MODAL");
  };

  const closeLogin = () => {
    toggleModal(false, "LOGIN_MODAL");
  };

  return (
    <>
      {screen.lg && (
        <StyledModalDrawer
          open={loginModal?.shown}
          closeIcon={null}
          footer={null}
        >
          <div
            className="cursor-pointer absolute top-6 right-6 z-20"
            onClick={closeLogin}
          >
            <CloseIcon size="24" color="#92B09F" />
          </div>
          <div className="grid grid-cols-12">
            <LeftSection />
            <div className="col-span-6 bg-white">
              <AnimatePresence mode="wait">
                {loginModal?.key === "LOGIN_MODAL" && (
                  <LoginSection registerPopup={registerPopup} />
                )}

                {loginModal?.key === "REGISTER_MODAL" && (
                  <RegisterSection loginPopup={loginPopup} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </StyledModalDrawer>
      )}
      {!screen.lg && (
        <StyledModalMobileDrawer
          open={loginModal?.shown}
          onClose={closeLogin}
          placement="bottom"
          height={"90%"}
          closeIcon={null}
          width={485}
          footer={null}
          className="scrollbar-hide"
        >
          <div
            className="cursor-pointer  absolute top-[26px] right-[15px] z-20"
            onClick={closeLogin}
          >
            <CloseIcon size="24" color="#92B09F" />
          </div>
          <div className="bg-black-600">
            <div className="flex flex-col px-4 pt-[74px] h-[305px] items-start justify-center w-full">
              <div className="mb-2">
                <Image
                  priority
                  src={Images.BlackLogo}
                  alt="logo"
                  width={120}
                  height={40}
                />
              </div>
              <Typography
                align="left"
                size="s1"
                as="p"
                className="font-medium text-xs mb-9"
              >
                Fresh Meat Delivered: Quality Cuts, Exceptional Taste!
              </Typography>
              <LeftMeatSection />
            </div>
          </div>
          <div className="mt-6 pb-24">
            <AnimatePresence mode="wait">
              {loginModal?.key === "LOGIN_MODAL" && (
                <LoginSectionMobile registerPopup={registerPopup} />
              )}

              {loginModal?.key === "REGISTER_MODAL" && (
                <RegisterSection loginPopup={loginPopup} />
              )}
            </AnimatePresence>
          </div>
        </StyledModalMobileDrawer>
      )}
    </>
  );
};
