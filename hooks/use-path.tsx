"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const params = useParams();
  const customerId = params?.customerId;
  const orderId = params?.orderId;
  const promotionId = params?.promotionId;
  const [locationCurrent, setLoc] = useState("");

  useEffect(() => {
    const key =
      pathname === "/dashboard"
        ? "/dashboard"
        : pathname === "/dashboard/products"
        ? "/dashboard/products"
        : pathname === "/dashboard/products/add"
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
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname, customerId, orderId, promotionId]);

  return { locationCurrent };
};

export default usePath;
