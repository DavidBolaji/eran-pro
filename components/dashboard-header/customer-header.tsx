"use client";
import React from "react";
import { Button } from "../button/button";
import { useQueryClient } from "@tanstack/react-query";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const CustomerTitleHeader: React.FC<{
  title: string;
  discardKey: string;
  addItem: () => void;
  save: boolean;
}> = ({ title, discardKey, addItem, save }) => {
  const queryClient = useQueryClient();
  const screen = useBreakpoint();
  const discard = () => {
    queryClient.setQueryData([discardKey], null);
  };

  const add = () => {
    addItem();
  };

  return (
    <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
      <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4">{title}</h1>
      <div className="flex gap-3">
        <Button size="lg" color="light" className="h-9" onClick={discard}>
          {screen.lg ? "Deactivate Customer Account" : "Deactivate"}
        </Button>
        <Button
          size="lg"
          color={!save ? "light" : "dark"}
          className="h-9"
          onClick={add}
        >
          {!save
            ? screen.lg
              ? "Edit Customer Details"
              : "Edit Details"
            : screen.lg
            ? "Save Customer Details"
            : "Save Details"}
        </Button>
      </div>
    </div>
  );
};
