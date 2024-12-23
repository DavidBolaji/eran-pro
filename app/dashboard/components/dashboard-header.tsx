"use client"
import { Avatar } from "@/components/avatar/avatar";
import { Typography } from "@/components/typography/typography";
import { ICON } from "@/constants/icon";
import { Images } from "@/constants/image";
import { MenuProps } from "antd";

import { Header } from "antd/es/layout/layout";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { MenuStyled } from "./dashboard.styles";
import { useUser } from "@/hooks/use-user";
import usePath from "@/hooks/use-path";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard/home", <ICON.GridIcon />),
  getItem("Products", "/dashboard/products", <ICON.TagIcon />),
  getItem(
    "Orders",
    "/dashboard/orders",
    <div className="-ml-1">
      <ICON.ShoppingCartIcon />
    </div>
  ),
  getItem("Customers", "/dashboard/customers", <ICON.UsersIcon />),
  getItem("Promotions", "/dashboard/promotions", <ICON.GiftIcon />),
  getItem("Content", "/dashboard/contents", <ICON.FileIcon />),
];

export const DashboardHeader = () => {
  const [visible, setVisible] = useState(false)
  const { logout } = useUser()
  const { locationCurrent } = usePath();

  const router = useRouter();
  const handleMenuClick = () => {
    setVisible(prev => !prev)
  }
  return (
    <Header
      style={{
        paddingLeft: 0,
        paddingRight: "40px",
        background: "#fff",
        height: 72,
        borderBottom: "1px solid #DDEEE5",
      }}
    >
      <div className="ml-10 mt-4 mb-10 md:hidden">
        <Image
          width={100}
          height={40}
          src={Images.BlackLogo}
          alt="Eranpro logo"
        />
      </div>
      <div className="flex justify-end items-center w-full space-x-4">
        <div className="items-center gap-x-2 md:flex hidden">
          <Avatar size="sm" />
          <div className="">
            <Typography as="p" size="s2" align="left">
              Admin
            </Typography>

          </div>
        </div>
        <div onClick={handleMenuClick} className="cursor-pointer relative z-50 -ml-4 mb-4 md:hidden">
          <div className="-translate-y-16">
            {visible ? <XIcon /> : <MenuIcon  />}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {visible && <motion.div
        className="bg-white absolute left-0 top-[9.6%] w-full mt-2 h-[91.5%] z-[9999]"
          initial={{
            x: -700,
          }}
          animate={{
            x: 0,
            transition: { type: "linear" },
          }}

          exit={{
            x: -700
          }}
        >
          <div className="flex justify-end items-center">
          {/* <div className="pl-4 -translate-y-6" onClick={handleMenuClick}>
            {visible ? <XIcon /> : <MenuIcon />}
          </div> */}
          </div>
          <MenuStyled
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[locationCurrent]}
            selectedKeys={[locationCurrent]}
            onClick={(menuInfo) => {
              handleMenuClick()
              router.push(menuInfo?.key)}
            }
            items={items.filter(() => {
              return true;
            })}
          />
          <div className="absolute bottom-3  px-4 translate-x-0 cursor-pointer gap-3 font-bold font-satoshi pl-12 flex items-center red-100"
            onClick={() => logout(true)}
          >
            <LogOut size={16} />
            Logout
          </div>

        </motion.div>}
      </AnimatePresence>
    </Header>
  );
};
