import React from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { Field, Form, Formik } from "formik";
import { Button } from "../button/button";

export const PromoForm = () => {
  return (
    <Formik
      initialValues={{
        code: "",
      }}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({}) => (
        <Form className="flex items-center gap-x-4">
          <Field
            as={FormikNormalInput}
            name="code"
            placeholder="Enter Promo code"
          />
          <Button size="lg" color="light" className="border-0 bg-black-600">
            Apply Code
          </Button>
        </Form>
      )}
    </Formik>
  );
};
