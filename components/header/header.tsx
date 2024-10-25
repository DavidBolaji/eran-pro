import React from "react";
import { Wrapper } from "@/components/wrapper/wrapper";
import { Button } from "../button/button";
import { RotateCCWIcon } from "@/constants/icons/rotate-ccw";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { LogInIcon } from "@/constants/icons/log-in";
import { UserIcon } from "@/constants/icons/user";
import { Typography } from "../typography/typography";
import { ChevronDownIcon } from "@/constants/icons/chevron-down";
import { Avatar } from "../avatar/avatar";

const categories = [
  { id: "1", name: "Chicken" },
  { id: "2", name: "Goat" },
  { id: "3", name: "Cow" },
];

export const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="h-20 bg-white border-b">
      <Wrapper>
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center px-6 gap-6 h-12 rounded-full border border-black-650 bg-black-700">
            {categories.map((category, index) => (
              <Typography key={category.id} size="s1" align="center" as="p">
                <span
                  className={`flex items-center gap-2 ${
                    index < categories.length - 1 &&
                    "pr-6 border-black-100 border-r"
                  }`}
                >
                  {category.name}
                  <ChevronDownIcon size="16" />
                </span>
              </Typography>
            ))}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button
                iconL={ShoppingCartIcon}
                className="bg-black-600 border-0"
                iconR={() => (
                  <span className="w-6 h-6 text-white rounded-full font-thin flex items-center justify-center bg-green">
                    2
                  </span>
                )}
                size="lg"
                color="light"
              >
                Cart
              </Button>
              <Button
                className="bg-black-600 border-0"
                iconL={RotateCCWIcon}
                size="lg"
                color="light"
              >
                Order History
              </Button>
              <Avatar size="lg" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                iconL={ShoppingCartIcon}
                iconR={() => (
                  <span className="w-6 h-6 text-white rounded-full font-thin flex items-center justify-center bg-green">
                    2
                  </span>
                )}
                className="bg-black-600 border-0"
                color="light"
              >
                Cart
              </Button>
              <Button size="lg" iconL={LogInIcon} color="light">
                Sign In
              </Button>
              <Button size="lg" color="dark" iconL={UserIcon}>
                Create An Account
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </nav>
  );
};
