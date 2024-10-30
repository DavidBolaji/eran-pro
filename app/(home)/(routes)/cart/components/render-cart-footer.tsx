"use client";
import React from "react";
import { CheckCircleIcon } from "@/constants/icons/check-circle";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button/button";
import { ChevronRightIcon } from "@/constants/icons/chevron-right";
import { PromoForm } from "@/components/form/promo-form";

export const RenderCartFooter = () => {
  const router = useRouter();

  const navigate = () => {
    close();
    router.push("/checkout");
  };

  return (
    <div className="pt-4 pb-8 px-6 bg-white py-6 lg:rounded-b-2xl">
      <div className=" pb-8">
        <PromoForm />
      </div>
      <div className="space-y-4">
        <Button
          color="dark"
          size="lg"
          iconR={CheckCircleIcon}
          onClick={navigate}
          className="w-full flex items-center justify-center h-12"
        >
          Proceed to Checkout
        </Button>
        <Button
          color="light"
          size="lg"
          iconR={ChevronRightIcon}
          onClick={() => close()}
          className="w-full flex items-center justify-center h-12"
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};
