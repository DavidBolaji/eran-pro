"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { ICON } from "@/constants/icon";
import { Button } from "../button/button";
import { useUser } from "@/hooks/use-user";
import * as Yup from "yup";
import { useNotification } from "@/hooks/use-notification";

import { useLoginModal } from "@/hooks/use-login-modal";

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const [type, setType] = useState<"password" | "text">("password");
  const { login } = useUser();
  const { toggleNotification } = useNotification();
  const { toggleModal } = useLoginModal();
  const togglePassword = () => {
    if (type === "password") return setType("text");
    setType("password");
  };

  const onSubmit = (values: { email: string; password: string }) => {
    LoginValidation.validate(values)
      .then(() => {
        login({ email: values.email, password: values.password });
      })
      .catch((reason) => {
        toggleNotification({
          type: "error",
          title: "Validation Error",
          message: reason.message,
          show: true,
        });
        toggleModal(false, "LOGIN_MODAL");
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
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
            align={-2}
            y={-14}
          />
          <Button size="lg" color="dark" type="submit" className="w-full">
            Login To Your Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};
