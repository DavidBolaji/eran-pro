import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";

import AddBlog from "../../component/add-blog";
import { getContent } from "@/actions/get-contents";
export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { blogId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function ContentEditPage({
  params,
  searchParams,
}: CustomerPageSearchParams) {
  const blogId = params.blogId;
  const blogRequest = getContent(blogId);
  console.log(searchParams)

  // Await both requests
  const [blog] = await Promise.all([
    blogRequest
  ]);


  return (
    <div className="p-4">
      <div>
        <Crumb
          crumbData={[
            {
              text: "Dashboard",
              href: "/",
            },
            {
              text: "Content",
              href: "/dashboard/contents",
            },
            {
              text: "Edit blog post",
              href: "",
            }
          ]}
        />
      </div>
      <AddBlog blog={blog ?? null} />
    </div>
  );
}
