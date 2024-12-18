"use client"
import { Button } from "@/components/button/button";
import { LoginForm } from "@/components/form/login-form";
import { Typography } from "@/components/typography/typography";
// import { ICON } from "@/constants/icon";
// import { useUser } from "@/hooks/use-user";
import { motion } from "framer-motion";
import React from "react";


export const LoginSectionMobile:React.FC<{registerPopup: () => void}> = ({registerPopup}) => {
  // const {googleLogin} = useUser()
  return (
    <motion.div
      key={"LOGIN_MODAL"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}
      className="flex flex-col px-4 justify-center w-full h-full"
    >
      <Typography
        size="h5"
        as="h5"
        align="left"
        className="font-medium text-2xl mb-6"
      >
        Login to Your EranPro Account
      </Typography>
      <LoginForm />
      {/* <div className="my-6 flex items-center justify-center space-x-4">
        <Typography
          size="s2"
          as="p"
          align="left"
          className="font-medium black-100 text-sm"
        >
          or sign in with
        </Typography>
        <div onClick={googleLogin}>
          <ICON.GoogleIcon />
        </div>
        <div>
          <ICON.FacebookCircleIcon />
        </div>
      </div> */}
      <Button
        size="lg"
        color="light"
        className="border-[#23342A] lg:w-full max-w-[235px] mx-auto font-medium black-100"
        onClick={registerPopup}
      >
        Create An Account
      </Button>
    </motion.div>
  );
};
