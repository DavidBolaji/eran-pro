"use client";
import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { Grid } from "antd";
import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";

import { Typography } from "@/components/typography/typography";

import { usePromotionCategoryDrawer } from "@/hooks/use-promotion-category-drawer";
import { PromotionCategoryForm } from "@/components/form/promotion-category-form";

const { useBreakpoint } = Grid;

export const PromotionCategoryDrawer = () => {
  const { categoryDrawer, toggleDrawer } = usePromotionCategoryDrawer();
  const screen = useBreakpoint();


  return (
    <div>
      {screen.lg && (
        <StyledDrawer
          open={(categoryDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(!categoryDrawer)}
          closeIcon={null}
          width={485}
          footer={null}
        >
          <div className="w-full h-24 sticky top-0 z-10 bg-grey-200 flex items-center justify-between px-9">
            <div className="flex items-center">
              <span className="inline-block pl-2.5 text-h5 font-bold text-2xl black-100">
              Select categories
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(!categoryDrawer)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          <div className="px-6">
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-300 pt-6 pb-4"
            >
             Select the categories to apply this promotion to.
            </Typography>
           <PromotionCategoryForm />
          </div>
        </StyledDrawer>
      )}

      {!screen.lg && (
        <StyledMobileDrawer
          open={(categoryDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(!categoryDrawer)}
          placement="bottom"
          height={"90%"}
          closeIcon={null}
          width={485}
          footer={null}
        >
          <div className="w-full h-[76px] sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
             
              <span className="inline-block pl-2.5 text-h5 font-bold text-xl black-100">
              Select categories
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(!categoryDrawer)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          <div className="px-6">
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-300 pt-6 pb-4"
            >
             Select the categories to apply this promotion to.
            </Typography>
            <PromotionCategoryForm />
          </div>
        </StyledMobileDrawer>
      )}
    </div>
  );
};
