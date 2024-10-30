import React from "react";
import { Crumb } from "@/components/crumb/crumb";
import { RenderCart } from "./components/render-cart";
import { RenderSummary } from "./components/render-summary";

const CartPage = () => {
  return (
    <div className="pb-20">
      <div className="py-10 lg:px-0 px-4">
        <Crumb crumbData={["Home", "Cart"]} />
      </div>
      <div className="grid lg:grid-cols-10 grid-cols-6 gap-x-6 lg:gap-y-0 gap-y-12">
        <div className="col-span-6 space-y-2 lg:px-0 px-4">
          <RenderCart />
        </div>
        <div className="lg:col-span-4 col-span-6">
          <RenderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
