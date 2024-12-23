import { getCategories } from "@/actions/get-categories";
import { ICreateProduct } from "@/actions/get-products";
import { getBlogCategories } from "@/actions/get-promotions";
import FormikSelectInput from "@/components/input/formik-select-input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { ChangeEvent } from "react";


export const BlogCategoryForm: React.FC<{ btnRef?: React.RefObject<HTMLButtonElement>, categoryId?: string | null | undefined }> = ({ btnRef, categoryId }) => {
  const queryClient = useQueryClient();
  const { data: category } = useQuery({
    queryKey: ['BLOG_CATEGORIES'],
    queryFn: async () => await getBlogCategories()
  })

  const isEdit = (categoryId && categoryId?.length > 0) ?? 0  

  const categoryList = category?.map(el => ({
    label: el.name,
    value: el.id
  }))

  return (
    <Formik
      initialValues={{
        categoryId:  categoryId ?? "",
      }}
      onSubmit={() => { }}
      enableReinitialize
    >
      {({ resetForm, setFieldValue }) => (
        <Form className="space-y-4">
          <Field
            as={FormikSelectInput}
            name="categoryId"
            options={categoryList ?? []}
            placeholder="Select category"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const categoryId = e.target.value;
              const obj = {
                categoryId
              };
              
              queryClient.setQueryData([isEdit ? "EDIT_BLOG" : "CREATE_BLOG"], (old: ICreateProduct) =>
                old
                  ? {
                    ...old,
                    ...obj,
                  }
                  : {
                    ...obj,
                  }
              );
              setFieldValue("categoryId", categoryId)
            }}
            align={-13}
            y={11}
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                categoryId: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};