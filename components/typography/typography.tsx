import classNames from "classnames";
import React, { HTMLAttributes, ReactNode } from "react";

type headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type texts = "c1" | "c2" | "s1" | "s2";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as: headings | "p";
  size: headings | texts;
  align: "left" | "center" | "right";
  children: ReactNode;
  onClick?: () => void;
}

export const Typography: React.FC<TypographyProps> = ({
  as = "h4",
  size = "h4",
  align = "left",
  children,
  onClick,
  ...rest
}) => {
const HeadingTag = as;
  const headingClassnames = classNames(
    "font-satoshi",
    {
      "text-h1 font-regular font tracking-wide": size === "h1",
      "text-h2 font-regular tracking-wide": size === "h2",
      "text-h3 font-regular tracking-wide": size === "h3",
      "text-h4 font-regular": size === "h4",
      "text-h5 tracking-normal": size === "h5",
      "text-h6 tracking-narrow": size === "h6",
      "text-s1 font-semibold tracking-narrow": size === "s1",
      "text-s2 font-semibold tracking-narrower": size === "s2",
      "text-c1 font-regular tracking-semi-wide": size === "c1",
      "text-c2 font-regular tracking-semi-wide": size === "c2",
    },
    {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    rest.className,
  );

  return <HeadingTag className={headingClassnames} onClick={onClick}>{children}</HeadingTag>;
};
