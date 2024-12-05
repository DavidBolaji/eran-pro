"use client";
import { IUser } from "@/actions/get-customers";
import { isAllowedFileType } from "@/components/form/add-product/upload-image-form";
import { Typography } from "@/components/typography/typography";
import { Images } from "@/constants/image";
import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";


export const UserUploadComponent: React.FC<{ view?: boolean }> = ({
  view = false,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const [url, setUrl] = useState(user?.pic);

  const open = () => {
    ref.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

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
      queryClient.setQueryData(["EDIT_CUSTOMER"], (old: IUser) => {
        if (old)
          return {
            ...old,
            pic: newUrls[0],
          };

        return { pic: newUrls[0] };
      });
      setUrl(newUrls[0]);
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

  return (
    <>
      <Typography as="p" size="s1" align="left" className=" black-100">
        Profile Image
      </Typography>
      <div className="flex h-full items-center gap-x-3">
        <div className="relative group overflow-hidden rounded-full">
          {loading && (
            <div className="absolute z-50 aspect-square bg-transparent h-full rounded-2xl flex items-center justify-center">
              <div className="animate-spin rounded-full w-4 h-4 border-b-2 border-[#7DBA00]" />
            </div>
          )}
          <div className="bg-black/20 rounded-full invisible group-hover:visible w-full h-full absolute" />
          <Image
            src={url ?? Images.Circle}
            alt="upload"
            width={110}
            height={111}
            className="rounded-full"
          />

          <button
            type="button"
            onClick={() => !loading && view && open()}
            className={`absolute transition-transform delay-200 cursor-pointer ${
              view && "group-hover:visible"
            } invisible  top-1/2 right-1/4 -translate-x-[13px] -translate-y-1/2 text-destructive-foreground rounded-full p-1`}
          >
            {!loading && <PlusCircleIcon className="h-6 w-6" color="#FFFFFF" />}
          </button>
          <input
            onChange={(e) => handleChange(e)}
            type="file"
            className="hidden"
            multiple
            accept="image/png,image/jpeg"
            ref={ref}
          />
        </div>
        <div className="">
          <div className="flex flex-col h-full">
            <Typography
              as="p"
              size="s2"
              align="left"
              className="font-satoshi font-bold mb-1 black-100"
            >
              Upload Image
            </Typography>
            <Typography
              as="p"
              size="s2"
              align="left"
              className="font-satoshi font-medium text-sm black-200 max-w-[214px]"
            >
              PNG, JPEG not more than 5mb in size.
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
