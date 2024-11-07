import { ICreateProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikRadioInput from "@/components/input/formik-radio-input";
import FormikSelectInput from "@/components/input/formik-select-input";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";

const options = [
  { name: "Per kg", value: "Per kg" },
  { name: "Per item", value: "Per item" },
];


export const ProductPriceForm = () => {
  const queryClient = useQueryClient();
  return (
    <Formik
      initialValues={{
        unit: "Per kg",
        price: "",
        promotion: "",
      }}
      onSubmit={() => {}}
      validateOnBlur
      validate={(values: { unit: string; price: string }) => {
        const errors = {};
        const { unit, price } = values;
        const obj = {
          unit: unit.toUpperCase(),
          price: +price,
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
      {({ values }) => (
        <Form className="space-y-4">
          <Field
            as={FormikRadioInput}
            defaultValue={values.unit}
            name="unit"
            options={options}
          />
          <div className="grid grid-cols-6 gap-x-2">
            <div className="col-span-3">
              <Field
                as={FormikNormalInput}
                name="price"
                placeholder={`Price per unit`}
                align={-13}
                required={false}
                naira
              />
            </div>
            <div className="col-span-3">
              <Field
                as={FormikSelectInput}
                name="promotion"
                options={[]}
                placeholder={`Select promotion to apply`}
                required={false}
                align={-25}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
