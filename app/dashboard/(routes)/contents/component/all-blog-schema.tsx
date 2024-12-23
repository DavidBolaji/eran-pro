import * as Yup from "yup";

export const blogDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Blog title is required"),
  description: Yup.string().required("Blog description is required"),
  categoryId: Yup.string().required("Blog Category is required"),
});

export const faqDetailsSchema = Yup.object().shape({
  question: Yup.string().required("Faq question is required"),
  answer: Yup.string().required("Faq answer is required"),
});

export const blogImageSchema = Yup.object().shape({
  img: Yup.string().required("Blog image is required"),
  text: Yup.string().required("Text content is required").trim(),
});

// Combine all schemas 
export const allBlogSchema = Yup.object().shape({
  ...blogDetailsSchema.fields,
  ...blogImageSchema.fields,
});

export const allFaqSchema = Yup.object().shape({
  ...faqDetailsSchema.fields,
});