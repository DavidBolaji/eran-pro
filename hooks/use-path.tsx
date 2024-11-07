"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const [locationCurrent, setLoc] = useState("");

  useEffect(() => {
    const key =
      pathname === "/dashboard"
        ? "/dashboard"
        : pathname === "/dashboard/products"
        ? "/dashboard/products"
        : pathname === "/dashboard/products/add"
        ? "/dashboard/products"
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname]);

  return { locationCurrent };
};

export default usePath;
