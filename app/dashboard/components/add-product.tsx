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
// import { useRouter } from "next/navigation";

export default function AddProduct() {
  const { toggleDrawer } = useCategoryDrawer();
  const { toggleNotification } = useNotification();
  const queryClient = useQueryClient();
  const Axios = useAxios()

  // const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async () => {
      const product = queryClient.getQueryData(["CREATE_PRODUCT"]);
      allProductSchema.validate(product).then(async () => {

        await Axios.post('/product', product)
        toggleNotification({
          show: true,
          title: "Product Created",
          type: "success",
          message:
            "Product has been created succesfully",
        });

      }).catch((reason) => {
        console.log(reason?.message);
        const errorList = String(reason)?.split(":");
        toggleNotification({
          show: true,
          title: errorList[1],
          type: "error",
          message:
          errorMessage[errorList[1].trim() as keyof typeof errorMessage],
        });
      })
    },
    onSuccess: () => {
      alert("Product ");
    },
  });
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title={"Add Product"}
        discardKey="ADD_PRODUCT"
        addItem={mutate}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Details */}
        <Card className="px-4 pt-6 h-[248px]">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Product Details
          </Typography>
          <ProductDetailsForm />
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
          <UploadImageForm />
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
              <ProductPriceForm />
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card className="p-6">
          <Typography size="s1" as="p" align="left" className="mb-4">
            Category
          </Typography>

          <ProductCategoryForm />
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

          <ProductInentoryForm />
        </Card>
      </div>
    </div>
  );
}
