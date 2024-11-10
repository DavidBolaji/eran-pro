"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { ICON } from "@/constants/icon";
import { Button } from "../button/button";

export const LoginForm = () => {
  const [type, setType] = useState<"password" | "text">("password");
  const togglePassword = () => {
    if (type === "password") return setType("text");
    setType("password");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    >
      {({}) => (
        <Form className="space-y-6 lg:w-[328px] w-full mx-auto pb-6 border-b">
          <Field
            as={FormikNormalInput}
            name="email"
            placeholder="Your Email"
            leftIcon={<ICON.MailIcon size="14" />}
            className="w-full bg-red"
            align={-3}
            y={-14}
          />
          <Field
            as={FormikNormalInput}
            name="password"
            placeholder="Password"
            type={type}
            leftIcon={<ICON.KeyIcon size="14" />}
            rightIcon={
              <div onClick={togglePassword}>
                {type === "password" ? (
                  <ICON.EyeOffIcon size="14" />
                ) : (
                  <ICON.EyeIcon />
                )}
              </div>
            }
            iconL={ICON.MailIcon}
            align={-2}
            y={-14}
          />
          <Button size="lg" color="dark" type="button" className="w-full">
            Login To Your Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};
