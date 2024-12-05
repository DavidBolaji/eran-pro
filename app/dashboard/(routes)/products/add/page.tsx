import AddProduct from "@/app/dashboard/components/add-product";
import { Crumb } from "@/components/crumb/crumb";
import React from "react";

export default async function AddProductPage() {
  return (
    <div className="p-4">
      <Crumb
        crumbData={[
          {
            text: "Dashboard",
            href: "/dashboard",
          },
          {
            text: "Products",
            href: "/dashboard/products",
          },
          {
            text: "Add product",
            href: "#",
          },
        ]}
      />
      <AddProduct />
    </div>
  );
}
