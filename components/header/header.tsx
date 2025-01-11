"use client";

import React, { useState } from "react";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Categories } from "./components/categories";
import { LogedIn } from "./components/loged-in";
import { LogedOut } from "./components/loged-out";
import { MenuIcon } from "@/constants/icons/menu";
import { Dropdown } from "antd";
import { useLoginModal } from "@/hooks/use-login-modal";
import { XIcon } from "lucide-react";
import styled from "@emotion/styled";
import { Typography } from "../typography/typography";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
// import PwaNotification from "../pwa-notification";

const StyledDropdown = styled(Dropdown)`
  margin-top: 50px;
`;

export const Header = () => {
  const [visible, setVisible] = useState(false);
  const { toggleModal } = useLoginModal();
  const router = useRouter();
  const { user } = useUser();

  const loginPopup = () => {
    toggleModal(true, "LOGIN_MODAL");
    // setVisible(false);
  };

  const registerPopup = () => {
    toggleModal(true, "REGISTER_MODAL");
    // setVisible(false);
  };

  const handleMenuClick = () => {
    setVisible(!visible);
  };

  const menu = !user
    ? [
        {
          key: "1",
          label: (
            <Typography
              className="black-300 h-8 flex items-center w-full"
              align="center"
              as="p"
              size="s1"
              onClick={loginPopup}
            >
              Sign In
            </Typography>
          ),
        },
        {
          key: "2",
          label: (
            <Typography
              className="black-300 h-8 flex items-center w-full"
              align="center"
              as="p"
              size="s1"
              onClick={registerPopup}
            >
              Create An Account
            </Typography>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Typography
              className="black-300 h-8 flex items-center w-full"
              align="center"
              as="p"
              size="s1"
              onClick={() => router.push(`/orders/${user?.id}`)}
            >
              Order History
            </Typography>
          ),
        },
      ];

  return (
    <nav className="h-20 bg-white border-b sticky z-50 top-0">
      <Wrapper>
        <div className="flex h-full items-center justify-between px-4">
         
          <div className="md:hidden flex items-center relative">
            <StyledDropdown
              menu={{ items: [...menu, {
                key: "5",
                label: (
                  <Typography
                    className="black-300 h-8 flex items-center w-full"
                    align="center"
                    as="p"
                    size="s1"
                    onClick={() => router.push(`/blog`)}
                  >
                    Blog
                  </Typography>
                ),
              } ] }}
              open={visible}
              onOpenChange={setVisible}
              trigger={["click"]}
              overlayClassName="bg-white w-full"
            >
              <div onClick={handleMenuClick} className="cursor-pointer -ml-4 ">
                <div className="pl-4 -translate-y-6">
                  {visible ? <XIcon /> : <MenuIcon />}
                </div>
              </div>
            </StyledDropdown>
          </div>
          <div className="hidden md:flex items-center px-6 gap-6 h-12 rounded-full border border-black-650 bg-black-700">
            <Categories />
          </div>
          <LogedIn />
          <LogedOut />
          {/* <PwaNotification /> */}
        </div>
      </Wrapper>
    </nav>
  );
};
