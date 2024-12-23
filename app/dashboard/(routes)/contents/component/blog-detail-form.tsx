import { ICreateProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { Blog } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";


export const BlogDetailsForm: React.FC<{  btnRef?: React.RefObject<HTMLButtonElement>, blog: Blog  | null | undefined }> = ({ btnRef, blog }) => {
  const queryClient = useQueryClient()
  const isEdit = (blog?.title?.length ?? 0) > 0 
  return (
    <Formik
      initialValues={{
        title: blog?.title ?? "",
        description: blog?.description ?? "",
      }}
      onSubmit={() => { }}
      validateOnBlur
      validate={(values: { title: string; description: string }) => {
        const errors = {};
        const { title, description } = values;
        const obj = {
          title,
          description
        };
        queryClient.setQueryData([isEdit ? "EDIT_BLOG" :"CREATE_BLOG"], (old: ICreateProduct) =>
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
            name="title"
            placeholder="Title"
            align={0}
            y={-14}
          />
          <Field
            as={FormikTextAreaInput}
            name="description"
            placeholder="Description"
            align={-10}
            rows={3}
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                title: "",
                description: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};