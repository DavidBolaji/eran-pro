"use client";

import { Card } from "@/components/ui/card";

import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";
import { ProductDetailsForm } from "@/components/form/add-product/product-details-form";
import { UploadImageForm } from "@/components/form/add-product/upload-image-form";
import { ProductPriceForm } from "@/components/form/add-product/product-price-form";
import { Typography } from "@/components/typography/typography";
import { ProductCategoryForm } from "@/components/form/add-product/product-category-form";
import { Button } from "@/components/button/button";
import { ICON } from "@/constants/icon";
import { ProductInentoryForm } from "@/components/form/add-product/product-inventory-form";
import { useCategoryDrawer } from "@/hooks/use-category-drawer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  allProductSchema,
} from "@/components/form/add-product/product-validation";
import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { IProduct } from "@/actions/get-products";
import { useRouter } from "next/navigation";


export default function AddProduct({ product }: { product?: IProduct | null }) {
  const { toggleDrawer } = useCategoryDrawer();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const queryClient = useQueryClient();
  const Axios = useAxios()
  const isEdit = (product?.name?.length ?? 0) > 0
  const urls =  product?.images.map(el => el.url);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);
  const btnRef3 = useRef<HTMLButtonElement>(null);
  const btnRef4 = useRef<HTMLButtonElement>(null);
  const btnRef5 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if ((product?.name.length ?? 0) > 0) {
      queryClient.setQueryData(["EDIT_PRODUCT"], () => ({
        id: product?.id,
        name: product?.name,
        description: product?.description,
        categoryId: product?.category.id,
        stock: product?.stock,
        qty: product?.qty,
        price: product?.price,
        unit: product?.unit,
        urls
      }));
    }
  }, [product])

  const reset = () => {
    queryClient.setQueryData(["CREATE_PRODUCT"], null);
    btnRef.current?.click()
    btnRef2.current?.click()
    btnRef3.current?.click()
    btnRef4.current?.click()
    btnRef5.current?.click()
    if(isEdit) {
      router.push('/dashboard/products')
    }
  }

  const { mutate } = useMutation({
    mutationKey: [isEdit ? "EDIT_PRODUCT" : "CREATE_PRODUCT"],
    mutationFn: async () => {
      setLoading(true);
  
      try {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Fetch the product from the cache
        let product = queryClient.getQueryData([isEdit ? "EDIT_PRODUCT" : "CREATE_PRODUCT"]) 
        if (isEdit) {
          const { id, urls, images, ...rest } = product as unknown as  IProduct & {  urls: string[]} ;
          let img: string[] = [];

          if (images && images?.length) {
            img = images as unknown as string[]
          }
          
          const all = img?.length ? [...img] : [...urls]
  
          product = {
            ...rest,
            productId: id,
            images: Array.from(new Set(all)), // Deduplicate images
          } as unknown as  Omit<IProduct, "images"> & {images: string[]} ;
        }
  
        console.log(product);
  
        // Validate the product schema
        await allProductSchema.validate(product);
  
        // Send the API request
        if (isEdit) {
          await Axios.put(`/product`, product);
        } else {
          await Axios.post(`/product`, product);
        }
  
        // Notify success
        toggleNotification({
          show: true,
          title: isEdit ? "Product Updated" : "Product Created",
          type: "success",
          message: `Product has been ${isEdit ? "updated" : "created"} successfully`,
        });
      } catch (error) {
        // Handle errors
        if (error) {
          const errorList = String(error)?.split(":");
          toggleNotification({
            show: true,
            title: errorList[1],
            type: "error",
            message: errorMessage[errorList[1].trim() as keyof typeof errorMessage],
          });
        } else {
          toggleNotification({
            show: true,
            title: isEdit ? "Update Product Error" : "Create Product Error",
            type: "error",
            message:
              (error as AxiosError<{ message: string }>).response?.data.message ?? "An error occurred",
          });
        }
      } finally {
        setLoading(false);
        reset();
      }
    },
  });

  
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title={isEdit ? "Edit Product" : "Add Product"}
        discard={reset}
        addItem={mutate}
        btnText={isEdit ? "Update" : "Add Product"}
        loading={loading}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Details */}
        <Card className="px-4 pt-6 h-[248px]">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Product Details
          </Typography>
          <ProductDetailsForm btnRef={btnRef} product={product} />
        </Card>

        {/* Product Image */}
        <Card className="px-4 pt-6 h-[248px]">
          <div className="flex items-center justify-between mb-4">
            <Typography size="s1" as="p" align="left" className="">
              Product Image
            </Typography>
            <p className="text-sm text-muted-foreground ">
              *Must add at least one product image
            </p>
          </div>
          <UploadImageForm btnRef={btnRef5} urls={urls} />
        </Card>

        {/* Product Price */}
        <Card className="p-6">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Product Price
          </Typography>
          <div className="space-y-4">
            <div>
              <Typography
                size="s1"
                as="p"
                align="left"
                className="mb-2 black-300"
              >
                Unit type
              </Typography>
              <ProductPriceForm btnRef={btnRef2} product={product} />
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card className="p-6">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Category
          </Typography>

          <ProductCategoryForm btnRef={btnRef3} categoryId={product?.category?.id} />
          <div className="flex justify-end mt-6">
            <Button
              size="lg"
              color="light"
              className="border-0 bg-black-600 black-100"
              iconR={ICON.PlusCircleIcon}
              onClick={() => toggleDrawer(true)}
            >
              Add New Category
            </Button>
          </div>
        </Card>

        {/* Inventory */}
        <Card className="p-6">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Inventory
          </Typography>

          <ProductInentoryForm btnRef={btnRef4} product={product} />
        </Card>
      </div>
    </div>
  );
}
