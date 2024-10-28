import { ChevronRightIcon } from "@/constants/icons/chevron-right";
import classNames from "classnames";
import React from "react";

export const Crumb: React.FC<{ crumbData: string[] }> = ({ crumbData }) => {
  return (
    <div className="flex items-center w-full">
      {crumbData.map((crumb, index) => {
        const isLast = index < crumbData.length - 1;
        const crumbStyle = classNames(
          "font-bold font-satoshi lg:text-base text-sm leading-6 gap-2 flex items-center mr-2",
          {
            "black-300": !isLast,
            "black-100": isLast,
          }
        );
        return (
          <span key={crumb} className={crumbStyle}>
            {crumb}
            {isLast && <ChevronRightIcon size="18" />}
          </span>
        );
      })}
    </div>
  );
};
