import { getProduct } from "@/actions/get-products";
import AddProduct from "@/app/dashboard/components/add-product";
import { Crumb } from "@/components/crumb/crumb";
import React from "react";

export const revalidate = 0;

interface EditProductPageSearchParams {
    params: { productId: string };
}

export default async function EditProductPage({
    params,
}: EditProductPageSearchParams) {
    const productId = params.productId;

    const product = await getProduct(productId);

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
                        text: "Edit product",
                        href: "#",
                    },
                ]}
            />
            <AddProduct product={product} />
        </div>
    );
}
