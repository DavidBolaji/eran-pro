"use client";
import { IUser } from "@/actions/get-customers";
import { editCustomerSchema } from "@/components/form/edit-customer-form";
import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const SaveUserButton = () => {
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const { update } = useUser();

  const onSave = async () => {
    const updatedUser = queryClient.getQueryData(["EDIT_CUSTOMER"]) as IUser;
    editCustomerSchema
      .validate(updatedUser)
      .then(() => {
        update(updatedUser)
      })
      .catch((reason) => {
        toggleNotification({
          type: "error",
          title: "Validation Error",
          message: (reason as Error).message,
          show: true,
        });
      });
  };
  return (
    <>
    <button
      onClick={onSave}
      className="bg-black-100 text-white md:w-auto w-full md:block hidden rounded-full text-nowrap px-4 py-2 text-sm font-satoshi"
    >
      Save Details
    </button>
    <button
      onClick={onSave}
      className="md:bg-black-100 md:hidden block md:mt-0 mt-8 md:border-0 border border-[#23342A] md:text-white black-100 md:w-auto w-full rounded-full text-nowrap px-4 py-2 text-sm font-satoshi"
    >
      Save Details
    </button>
    </>
  );
};
