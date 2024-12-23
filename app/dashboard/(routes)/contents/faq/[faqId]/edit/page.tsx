import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";


import { getContentFaq } from "@/actions/get-contents";
import AddFaq from "../../../component/add-faq";
export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { faqId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function ContentEditPage({
  params,
  searchParams,
}: CustomerPageSearchParams) {
  const faqId = params.faqId;
  const faqRequest = getContentFaq(faqId);
  console.log(searchParams)

  // Await both requests
  const [faq] = await Promise.all([
    faqRequest
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
              href: "/dashboard/content?tab=FAQs",
            },
            {
              text: "Edit FAQs",
              href: "",
            }
          ]}
        />
      </div>
      <AddFaq faq={faq ?? null} />
    </div>
  );
}
