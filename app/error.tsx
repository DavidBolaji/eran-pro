"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ErrorPage = ({ statusCode }: { statusCode: string }) => {
  const path = usePathname();
  return (
    <div className="flex w-full flex-col h-full justify-center items-center">
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <Link href={path}>retry</Link>
    </div>
  );
};

export default ErrorPage;