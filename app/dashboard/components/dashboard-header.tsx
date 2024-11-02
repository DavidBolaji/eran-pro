import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { Typography } from "@/components/typography/typography";
import { BellIcon } from "@/constants/icons/bell";
import { Header } from "antd/es/layout/layout";
import React from "react";

export const DashboardHeader = () => {
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
      <div className="flex justify-end items-center w-full space-x-4">
        <Button iconL={BellIcon} color="light" size="lg">
          Notifications
        </Button>
        <div className="flex items-center gap-x-2">
          <Avatar size="sm" />
          <Typography as="p" size="s2" align="left">
            Admin
          </Typography>
        </div>
      </div>
    </Header>
  );
};
