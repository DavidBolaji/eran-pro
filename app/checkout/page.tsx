import React from "react";
import { RenderSummaryCheckout } from "./components/render-summary-checkout";
import { BillingForm } from "@/components/form/billing-form";
import { Typography } from "@/components/typography/typography";

const ChectOutage = () => {
  return (
    <div className="pb-20 ">
      <div className="py-10" />
      <div className="grid lg:grid-cols-10 grid-cols-6 gap-x-6 lg:gap-y-0 gap-y-12">
        <div className="col-span-6 space-y-2 lg:px-0 px-4">
          <Typography as="h5" size="h5" align="left" className="mb-6 font-bold text-2xl leading-8 black-100">
            Billing and Delivery
          </Typography>
          <BillingForm />
        </div>
        <div className="lg:col-span-4 col-span-6 bg-black-100 lg:rounded-2xl">
          <RenderSummaryCheckout />
          <div className="pb-10" />
        </div>
      </div>
    </div>
  );
};

export default ChectOutage;
