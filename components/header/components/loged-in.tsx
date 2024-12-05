"use client";

import { Button } from "@/components/button/button";
import { CartButton } from "@/components/button/cart-button";
import { DropdownCustom } from "@/components/dropdown/dropdown";
import { RotateCCWIcon } from "@/constants/icons/rotate-ccw";
import { useUser } from "@/hooks/use-user";
import { Grid } from "antd";
import { useRouter } from "next/navigation";

import React from "react";
const { useBreakpoint } = Grid;
export const LogedIn = () => {
  const screen = useBreakpoint();
  const router = useRouter();
  const { user, logout } = useUser();

  return (
    !!user && (
      <div className="flex items-center gap-4">
        <CartButton />
        <Button
          className="bg-black-600 border-0 md:flex hidden"
          iconL={RotateCCWIcon}
          size={screen.lg ? "lg" : "sm"}
          color="light"
          onClick={() => router.push(`/orders/${user?.id}`)}
        >
          Order History
        </Button>
        <DropdownCustom
          pic={user?.pic ?? null}
          items={[
            {
              key: "signout",
              label: (
                <span
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </span>
              ),
            },
          ]}
        />
      </div>
    )
  );
};
