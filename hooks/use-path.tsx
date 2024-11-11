"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const params = useParams();
  const customerId = params?.customerId;
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
        : pathname === `/dashboard/customers/${customerId}`
        ? "/dashboard/customers"
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname, customerId]);

  return { locationCurrent };
};

export default usePath;
