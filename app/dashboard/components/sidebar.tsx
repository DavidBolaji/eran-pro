"use client"
import { ICON } from "@/constants/icon";
import { Images } from "@/constants/image";
import { MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import React from "react";
import { MenuStyled } from "./dashboard.styles";
import usePath from "@/hooks/use-path";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <ICON.GridIcon />),
  getItem('Products', '/dashboard/products', <ICON.TagIcon />),
  getItem('Orders', '/dashboard/orders', <div className="-ml-1"><ICON.ShoppingCartIcon /></div>),
  getItem('Customers', '/dashboard/customers', <ICON.UsersIcon />),
  getItem('Analytics', '/dashboard/analytics', <ICON.PieChartIcon />),
  getItem('Notifications', '/dashboard/notifications',<div className="-ml-1"><ICON.BellIcon /></div> ),
  getItem('Promotions', '/dashboard/promotions', <ICON.GiftIcon />),
  getItem('Content', '/dashboard/content', <ICON.FileIcon />),
]

export const Sidebar = () => {
  const { locationCurrent } = usePath()
  const router = useRouter()
  return (
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
          return true
        })}
      />

    </Sider>
  );
};
