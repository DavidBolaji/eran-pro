import { ICreateProduct, IProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";


export const ProductDetailsForm: React.FC<{  btnRef?: React.RefObject<HTMLButtonElement>, product: IProduct | null | undefined }> = ({ btnRef, product }) => {
  const queryClient = useQueryClient()
  const isEdit = (product?.name?.length ?? 0) > 0 
  return (
    <Formik
      initialValues={{
        name: product?.name ?? "",
        description: product?.description ?? "",
      }}
      onSubmit={() => { }}
      validateOnBlur
      validate={(values: { name: string; description: string }) => {
        const errors = {};
        const { name, description } = values;
        const obj = {
          name,
          description
        };
        queryClient.setQueryData([isEdit ? "EDIT_PRODUCT" :"CREATE_PRODUCT"], (old: ICreateProduct) =>
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
      {({ resetForm }) => (
        <Form className="space-y-4">
          <Field
            as={FormikNormalInput}
            name="name"
            placeholder="Product name"
            align={-9}
            y={-14}
          />
          <Field
            as={FormikTextAreaInput}
            name="description"
            placeholder="Product description"
            align={-19}
            rows={3}
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                name: "",
                description: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};