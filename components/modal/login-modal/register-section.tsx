"use client";
import { Button } from "@/components/button/button";
import { RegisterForm } from "@/components/form/register-form";
import { Typography } from "@/components/typography/typography";
// import { ICON } from "@/constants/icon";
// import { useUser } from "@/hooks/use-user";

import { motion } from "framer-motion";
import React from "react";

export const RegisterSection: React.FC<{ loginPopup: () => void }> = ({
  loginPopup,
}) => {
  // const { googleSignUP } = useUser();
  return (
    <motion.div
      key={"REGISTER_MODAL"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}
      className="flex flex-col items-center lg:px-0 px-4 justify-center w-full h-full"
    >
      <Typography
        size="h5"
        as="h5"
        align="left"
        className="lg:max-w-[328px] w-full font-medium text-2xl mb-6"
      >
        Create An EranPro Account
      </Typography>
      <RegisterForm />
      {/* <div className="my-6 flex items-center justify-center space-x-4">
        <Typography
          size="s2"
          as="p"
          align="left"
          className="font-medium black-100 text-sm"
        >
          or sign up with
        </Typography>
        <div onClick={googleSignUP}>
          <ICON.GoogleIcon />
        </div>
        <div>
          <ICON.FacebookCircleIcon />
        </div>
      </div> */}
      <Button
        size="lg"
        color="light"
        className="border-[#23342A] font-medium black-100"
        onClick={loginPopup}
      >
        Login To Your Account
      </Button>
    </motion.div>
  );
};
