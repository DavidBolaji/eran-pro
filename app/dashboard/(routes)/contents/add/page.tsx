import { Crumb } from "@/components/crumb/crumb";
import React from "react";
import AddBlog from "../component/add-blog";

export default async function AddBlogPage() {
  return (
    <div className="p-4">
      <Crumb
        crumbData={[
          {
            text: "Dashboard",
            href: "/dashboard",
          },
          {
            text: "Content",
            href: "/dashboard/contents",
          },
          {
            text: "Create blog post",
            href: "#",
          },
        ]}
      />
      <AddBlog />
    </div>
  );
}
