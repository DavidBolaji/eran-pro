import { Button } from "@/components/button/button";
import { Form, Formik } from "formik";
import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, ChangeEvent, useState } from "react";
import { productImageSchema } from "./product-validation";
import { useNotification } from "@/hooks/use-notification";
import { useQueryClient } from "@tanstack/react-query";
import { ICreateProduct } from "@/actions/get-products";

export const isAllowedFileType = (fileType: string) =>
  ["image/jpeg", "image/png"].includes(fileType);

export const UploadImageForm = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const open = () => {
    ref.current?.click();
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    values: { urls: string[] },
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (values.urls.length + files.length > 5) {
      toggleNotification({
        show: true,
        title: "You can only upload up to 5 images",
        type: "error",
        message: "Image upload for product cannot be more than 5",
      });
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!isAllowedFileType(file.type)) {
          toggleNotification({
            show: true,
            title: "Invalid file type",
            type: "error",
            message: "Image upload must be of type PNG or JPEG.",
          });
        }

        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          toggleNotification({
            show: true,
            title: "File to large",
            type: "error",
            message: "Image Files must be less than 5MB",
          });
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ""
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dhwlkhbet/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      });

      const newUrls = await Promise.all(uploadPromises);
      setFieldValue("urls", [...values.urls, ...newUrls]);
      queryClient.setQueryData(["CREATE_PRODUCT"], (old: ICreateProduct) =>
        old
          ? {
              ...old,
              images: [...values.urls, ...newUrls],
            }
          : {
              images: [...values.urls, ...newUrls],
            }
      );
    } catch (error) {
      toggleNotification({
        show: true,
        title: "Error uploading image(s)",
        type: "error",
        message: `${(error as Error).message}`,
      });
    } finally {
      setLoading(false);
      if (ref.current) {
        ref.current.value = "";
      }
    }
  };

  const removeImage = (
    index: number,
    values: { urls: string[] },
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const newUrls = values.urls.filter((_, idx) => idx !== index);
    setFieldValue("urls", newUrls);
    queryClient.setQueryData(["CREATE_PRODUCT"], (old: ICreateProduct) => ({
      ...old,
      images: newUrls,
    }));
  };

  return (
    <Formik
      initialValues={{
        urls: [],
      }}
      validationSchema={productImageSchema}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="min-h-[200px]">
            <div className="space-y-4">
              {values.urls.length === 0 && !loading ? (
                <div className="flex flex-col p-8 items-center border-2 border-dashed rounded-lg justify-center gap-y-2">
                  <p className="text-sm">Upload Images</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPEG not more than 5MB in size.
                  </p>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
                  {values.urls.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-square w-16 h-16 flex items-center justify-center"
                    >
                      <div className="bg-black/20 absolute w-full h-full rounded-2xl" />
                      <Image
                        src={url}
                        alt={`Upload ${idx + 1}`}
                        className="rounded-lg object-cover p-2"
                        width={64}
                        height={64}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, values, setFieldValue)}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-destructive-foreground rounded-full p-1 "
                      >
                        <Trash2 className="h-4 w-4" color="white" />
                      </button>
                    </div>
                  ))}

                  <div className="relative aspect-square border-dashed w-16 h-16 rounded-2xl border-[#6E8C7B] bg-grey-200 border-2 flex items-center justify-center">
                    {/* <div className="rounded-2xl object-cover p-2 w-16 h-16" /> */}
                    <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-[#7DBA00]" />
                    {/* <div className="flex items-center justify-center h-full w-full">
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
                  {values.urls.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-square w-16 h-16 flex items-center justify-center"
                    >
                      <div className="bg-black/20 absolute w-full h-full rounded-2xl" />
                      <Image
                        src={url}
                        alt={`Upload ${idx + 1}`}
                        className="rounded-lg object-cover p-2"
                        width={64}
                        height={64}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, values, setFieldValue)}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-destructive-foreground rounded-full p-1 "
                      >
                        <Trash2 className="h-4 w-4" color="white" />
                      </button>
                    </div>
                  ))}
                  {values.urls.length > 0 && values.urls.length < 5 && (
                    <div className="relative aspect-square border-dashed w-16 h-16 rounded-2xl border-[#6E8C7B] bg-grey-200 border-2 flex items-center justify-center">
                      <div className="rounded-2xl object-cover p-2 w-16 h-16" />
                      <button
                        type="button"
                        onClick={open}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-destructive-foreground rounded-full p-1 "
                      >
                        <PlusCircle className="h-6 w-6" color="#23342A" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {values.urls.length > 0 && values.urls.length < 5 && (
              <div className="text-xs italic black-200 font-medium leading-4 pt-4 pb-2 text-center w-full block">
                Add more images (Up to {5 - values.urls.length})
              </div>
            )}
            <input
              onChange={(e) => handleChange(e, values, setFieldValue)}
              type="file"
              className="hidden"
              multiple
              accept="image/png,image/jpeg"
              ref={ref}
            />
            <div className="mt-4 flex flex-col items-center gap-2">
              <Button
                color="light"
                size="lg"
                className="bg-black-600 border-0 h-9"
                onClick={open}
              >
                Upload Images
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
