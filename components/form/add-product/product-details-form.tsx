import { ICreateProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";


export const ProductDetailsForm = () => {
  const queryClient = useQueryClient()
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      onSubmit={() => {}}
      validateOnBlur
      validate={(values: { name: string; description: string }) => {
        const errors = {};
        const { name, description } = values;
        const obj = {
          name,
          description
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
      enableReinitialize
    >
      {({}) => (
        <Form className="space-y-4">
          <Field
            as={FormikNormalInput}
            name="name"
            placeholder="Product name"
            align={-12}
          />
          <Field
            as={FormikTextAreaInput}
            name="description"
            placeholder="Product description"
            align={-20}
            rows={3}
          />
         
        </Form>
      )}
    </Formik>
  );
};