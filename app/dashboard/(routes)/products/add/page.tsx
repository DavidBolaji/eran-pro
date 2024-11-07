import AddProduct from "@/app/dashboard/components/add-product";
import { Crumb } from "@/components/crumb/crumb";
import React from "react";

export default async function AddProductPage() {
  return (
    <div>
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

{
  /* <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
<Link href="/dashboard" className="hover:text-foreground">
  Dashboard
</Link>
<ChevronRight className="h-4 w-4" />
<Link href="/products" className="hover:text-foreground">
  Products
</Link>
<ChevronRight className="h-4 w-4" />
<span className="text-foreground">Add Product</span>
</nav> */
}
