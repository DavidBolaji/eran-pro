"use client";
import React from "react";
import { Button } from "../button/button";
import { useQueryClient } from "@tanstack/react-query";

export const CustomerTitleHeader: React.FC<{
  title: string;
  discardKey: string;
  addItem: () => void;
}> = ({ title, discardKey, addItem }) => {
  const queryClient = useQueryClient();
  const discard = () => {
    queryClient.setQueryData([discardKey], null);
  };

  const add = () => {
    addItem();
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex gap-3">
        <Button size="lg" color="light" className="h-9" onClick={discard}>
          Deactivate Customer Account
        </Button>
        <Button size="lg" color="light" className="h-9" onClick={add}>
          Edit Customer Details
        </Button>
      </div>
    </div>
  );
};