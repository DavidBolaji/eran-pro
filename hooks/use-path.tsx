"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const params = useParams();
  const customerId = params?.customerId;
  const orderId = params?.orderId;
  const productId = params?.productId;
  const promotionId = params?.promotionId;
  const blogId = params?.blogId;
  const faqId = params?.faqId;
  const [locationCurrent, setLoc] = useState("");

  useEffect(() => {
    const key =
      pathname === "/dashboard/home"
        ? "/dashboard/home"
        : pathname === "/dashboard/products"
        ? "/dashboard/products"
        : pathname === "/dashboard/products/add"
        ? "/dashboard/products"
        : pathname === `/dashboard/products/edit/${productId}`
        ? "/dashboard/products"
        : pathname === "/dashboard/customers"
        ? "/dashboard/customers"
        : pathname === "/dashboard/orders"
        ? "/dashboard/orders"
        : pathname === "/dashboard/orders/add"
        ? "/dashboard/orders"
        : pathname === `/dashboard/customers/${customerId}`
        ? "/dashboard/customers"
        : pathname === `/dashboard/customers/${customerId}/edit`
        ? "/dashboard/customers"
        : pathname === `/dashboard/promotions`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/orders/${orderId}`
        ? "/dashboard/orders"
         : pathname === `/dashboard/promotions/add`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/promotions/${promotionId}`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/promotions/${promotionId}/edit`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/contents`
        ? "/dashboard/contents"
         : pathname === "/dashboard/contents/add"
        ? "/dashboard/contents"
         : pathname === `/dashboard/contents/${blogId}/edit`
        ? "/dashboard/contents"
         : pathname === `/dashboard/contents/faq/${faqId}/edit`
        ? "/dashboard/contents"
         : pathname === `/dashboard/contents/faq/add`
        ? "/dashboard/contents"
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname, customerId, orderId, promotionId, blogId, faqId]);

  return { locationCurrent };
};

export default usePath;
