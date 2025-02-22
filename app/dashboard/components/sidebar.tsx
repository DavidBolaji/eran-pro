"use client";
import { ICON } from "@/constants/icon";
import { Images } from "@/constants/image";
import { Grid, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import React from "react";
import { MenuStyled } from "./dashboard.styles";
import usePath from "@/hooks/use-path";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useUser } from "@/hooks/use-user";

const { useBreakpoint } = Grid;

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

export const Sidebar = () => {
  const {logout} = useUser()
  const { locationCurrent } = usePath();
  const screen = useBreakpoint();
  const router = useRouter();
  return (
    screen.lg && (
      <Sider
        trigger={null}
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          maxHeight: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid #DDEEE5",
        }}
        width={269}
      >
        <div className="ml-10 mt-4 mb-10">
          <Image
            width={100}
            height={40}
            src={Images.BlackLogo}
            alt="Eranpro logo"
          />
        </div>
        <MenuStyled
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[locationCurrent]}
          selectedKeys={[locationCurrent]}
          onClick={(menuInfo) => router.push(menuInfo?.key)}
          items={items.filter(() => {
            return true;
          })}
        />
         <div className="absolute bottom-6  px-5 -translate-x-2 cursor-pointer gap-3 font-bold font-satoshi pl-12 flex items-center red-100"
         onClick={() => logout(true)}
         >
          <LogOut size={16} />
          Logout
        </div>
      </Sider>
    )
  );
};
