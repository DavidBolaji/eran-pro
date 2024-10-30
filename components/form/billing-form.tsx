"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import FormikNormalInput from "../input/formik-normal-input";
import LocationComponent from "../input/LocationComponent/LocationComponent";
import { Typography } from "../typography/typography";
import FormikTextAreaInput from "../input/formik-textarea-input";

export const BillingForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        phone: "",
        fname: "",
        lname: "",
        country: "",
        state: "",
        city: "",
        address: "",
        extra: "",
      }}
      onSubmit={() => {}}
    >
      {({}) => (
        <Form className="space-y-6">
          <Field
            as={FormikNormalInput}
            name="email"
            placeholder="Email"
            align={-3}
          />
          <Field
            as={FormikNormalInput}
            name="phone"
            placeholder="Phone"
            align={-3}
          />
          <div className="grid grid-cols-10 gap-x-4">
            <div className="col-span-5">
              <Field
                as={FormikNormalInput}
                name="fname"
                placeholder="First Name"
                align={-7}
              />
            </div>
            <div className="col-span-5">
              <Field
                as={FormikNormalInput}
                name="lname"
                placeholder="Last name"
                align={-7}
              />
            </div>
          </div>
          <Field
            as={LocationComponent}
            city={"city"}
            state={"state"}
            country={"country"}
            address={"address"}
            align={-12}
            align2={-4}
          />
          <Typography as="h6" size="h6" align="left" className="black-100">
            Additional Information
          </Typography>

          <Field
            as={FormikTextAreaInput}
            name="extra"
            rows={5}
            placeholder="Provide additional information about the delivery"
            align={-42}
          />
        </Form>
      )}
    </Formik>
  );
};

