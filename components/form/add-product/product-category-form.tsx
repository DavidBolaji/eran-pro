import { getCategories } from "@/actions/get-categories";
import { ICreateProduct } from "@/actions/get-products";
import FormikSelectInput from "@/components/input/formik-select-input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";


export const ProductCategoryForm = () => {
  const queryClient = useQueryClient();
   const {data: category} =  useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: async() => await getCategories()
   })

   const categoryList = category?.map(el => ({
    label: el.name,
    value: el.id
   }))

  return (
    <Formik
      initialValues={{
        categoryId: "",
      }}
      onSubmit={() => {}}
      validate={(values: { categoryId: string }) => {
        const errors = {};
        const { categoryId } = values;
        const obj = {
          categoryId
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
      validateOnBlur
      enableReinitialize
    >
      {({}) => (
        <Form className="space-y-4">
          <Field
            as={FormikSelectInput}
            name="categoryId"
            options={categoryList ?? []}
            placeholder="Select category"
            align={-13}
          />
         
        </Form>
      )}
    </Formik>
  );
};