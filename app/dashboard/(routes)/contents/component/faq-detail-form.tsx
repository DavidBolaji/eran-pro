import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { Faq } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";


export const FAQDetailsForm: React.FC<{  btnRef?: React.RefObject<HTMLButtonElement>, faq: Faq  | null | undefined }> = ({ btnRef, faq }) => {
  const queryClient = useQueryClient()
  const isEdit = (faq?.question?.length ?? 0) > 0 
  return (
    <Formik
      initialValues={{
        question: faq?.question ?? "",
        answer: faq?.answer ?? "",
      }}
      onSubmit={() => { }}
      validateOnBlur
      validate={(values: { question: string; answer: string }) => {
        const errors = {};
        const { question, answer } = values;
        const obj = {
          question,
          answer
        };
        queryClient.setQueryData([isEdit ? "EDIT_FAQ" :"CREATE_FAQ"], (old: Faq) =>
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
            name="question"
            placeholder="Question"
            align={-6}
            required
            y={-14}
          />
          <Field
            as={FormikTextAreaInput}
            name="answer"
            placeholder="Answer"
            align={-6}
            rows={3}
            required
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                question: "",
                answer: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};