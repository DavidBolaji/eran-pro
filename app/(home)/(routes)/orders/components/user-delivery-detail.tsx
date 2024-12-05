"use client";
import FormikRadioInput from "@/components/input/formik-radio-input";
import { Typography } from "@/components/typography/typography";
import { Address } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Empty } from "antd";
import { Field, Formik } from "formik";
import React from "react";

const defaultAdd = (address: Address[]) => address.find((el) => el.active);
const addressList = (address: Address[]) =>
  address.map((address: Address) => ({
    id: address.id,
    name: "Select delivery address",
    label: (
      <div className="flex flex-col space-y-1 py-4 capitalize">
        <span className="font-medium black-100 font-satoshi">
          {address.address},
        </span>
        <span className="font-medium black-100 font-satoshi">
          {address.city},
        </span>
        <span className="font-medium black-100 font-satoshi">
          {address.state},
        </span>
        <span className="font-medium black-100 font-satoshi">
          {address.country}.
        </span>
      </div>
    ),
    value: address.id,
  }));

export const UserDeliveryDetail: React.FC<{
  address: Address[];
}> = ({ address }) => {
  const arrAddress = addressList(address);
  const queryClient = useQueryClient();
  return (
    <div className="bg-white px-4 py-6 rounded-2xl mt-6 border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="black-100">
        Delivery Details
      </Typography>
      {address.length ? (
        <Formik
          onSubmit={() => {}}
          initialValues={{
            address: defaultAdd(address)?.id,
          }}
          validate={(values) => {
            const errors = {};
            queryClient.setQueryData(["ADDRESS_ID"], values.address);
            return errors;
          }}
          validateOnChange
        >
          {({ values }) => (
            <div className="">
              <Field
                as={FormikRadioInput}
                value={values.address}
                name="address"
                options={arrAddress}
                rev
                col
                disabled
              />
            </div>
          )}
        </Formik>
      ) : (
        <div className="py-10 mt-4 rounded-2xl border">
          <Empty />
        </div>
      )}
    </div>
  );
};
