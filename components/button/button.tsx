import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "lg";
  color: "dark" | "light";
  iconL?: React.ComponentType<{ size?: string, color?: string }>; // Make `size` optional
  iconR?: React.ComponentType<{ size?: string, color?: string }>;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = "lg",
  color = "dark",
  iconL: IconL,
  iconR: IconR,
  children,
  ...rest
}) => {
  const { className, ...props } = rest;

  const buttonClassnames = classNames(
    "text-s2 text-center py-2 rounded-full font-medium h-10",
    {
      "px-6": size === "lg",
      "px-3": size === "sm",
    },
    {
      "bg-black-100 text-white": color === "dark",
      "bg-white text-black-100 border border-black-100": color === "light",
    },
    IconL || IconR ? "gap-2 flex items-center" : null, // Add flex layout and gap if there's an icon
    className,
  );

  return (
    <button className={buttonClassnames} {...props}>
      {/* Render icon on the left or both positions */}
      { IconL && (
        <IconL size={size === "lg" ? "24px" : "16px"} color={color === "light" ? undefined: "#ffffff"} />
      )}
      {children}
      {/* Render icon on the right or both positions */}
      {IconR && (
        <IconR size={size === "lg" ? "24px" : "16px"} color={color === "light" ? undefined: "#ffffff"} />
      )}
    </button>
  );
};
