import * as Yup from "yup";

export const productImageSchema = Yup.object().shape({
  urls: Yup.array()
    .min(1, "Please upload at least one image")
    .max(5, "You can only upload up to 5 images")
    .required("Images are required"),
});

export const productImageSchema2 = Yup.object().shape({
  images: Yup.array()
    .min(1, "Please upload at least one image")
    .max(5, "You can only upload up to 5 images")
    .required("Images are required"),
});

export const productPriceSchema = Yup.object().shape({
  unit: Yup.string().required("Product unit is required"),
  price: Yup.number().required("Product price is required").integer("Product price must be number"),
});

export const productInentorySchema = Yup.object().shape({
  stock: Yup.boolean().required("Product stock is required"),
  qty: Yup.number().required("Product quantity is required").integer("Product quantity must be number"),
});

export const productDetailsSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Product description is required"),
});

export const productCategorySchema = Yup.object().shape({
  name: Yup.string().required("Product category is required"),
});

// Combine all schemas 
export const allProductSchema = Yup.object().shape({
  ...productDetailsSchema.fields,
  ...productCategorySchema.fields,
  ...productImageSchema2.fields,
  ...productInentorySchema.fields,
  ...productPriceSchema.fields,
});
