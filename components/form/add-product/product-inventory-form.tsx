import { ICreateProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import { Toggle } from "@/components/input/toggle";
import { useQueryClient } from "@tanstack/react-query";

import { Field, Form, Formik } from "formik";
import React from "react";

export const ProductInentoryForm = () => {
  const queryClient = useQueryClient()
  return (
    <Formik
      initialValues={{
        stock: true,
        qty: "",
      }}
      validate={(values: { stock: boolean; qty: string }) => {
        const errors = {};
        const { stock, qty } = values;
        console.log('[STOCK]', stock)
        const obj = {
          stock,
          qty: +qty,
        };
        queryClient.setQueryData(["CREATE_PRODUCT"], (old: ICreateProduct) =>
          old
            ? {
                ...old,
                ...obj,
              }
            : {
                ...obj,
              }
        );
        return errors;
      }}
      validateOnChange
      onSubmit={() => {}}
      enableReinitialize
    >
      {({}) => (
        <Form className="">
          <div className="mb-6">
            <Field as={Toggle} name="stock" label="In stock" />
          </div>
          <Field
            as={FormikNormalInput}
            name="qty"
            placeholder="Quantity in stock"
            align={-12}
          />
        </Form>
      )}
    </Formik>
  );
};
