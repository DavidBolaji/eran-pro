import { UserIcon } from "@/constants/icons/user";
import classNames from "classnames";
import Image from "next/image";
import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size: "lg" | "sm";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  alt,
  className,
}) => {
  const avatarClassnames = classNames(
    "rounded-full object-cover bg-green",
    {
      "w-12 h-12": size === "lg",
      "w-10 h-10": size === "sm",
    },
    !src && "flex justify-center items-center",
    src && "border-0 bg-transparent",
    className,
  );

  return src ? (
    <Image priority width={110} height={111} src={src} className={avatarClassnames} alt={alt ?? "avatar"} />
  ) : (
    <div className={avatarClassnames}>
      <UserIcon color="#ffffff" />
    </div>
  );
};
