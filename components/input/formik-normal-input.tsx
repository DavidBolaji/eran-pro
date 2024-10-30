// formik-normal-input.tsx

import React, { InputHTMLAttributes, FocusEvent } from "react";
import { useField } from "formik";
import NormalInput from "./normal-input";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function FormikNormalInput({ placeholder, ...rest }: FormikInputProps) {
  const [field] = useField(rest.name!);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    if (rest.onBlur) rest.onBlur(e);
  };

  return (
    <NormalInput
      {...rest}
      {...field}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
}
