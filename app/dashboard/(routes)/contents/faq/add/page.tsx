import { Crumb } from "@/components/crumb/crumb";
import React from "react";
import AddFaq from "../../component/add-faq";


export default async function AddFaqPage() {
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
            href: "/dashboard/contents?tab=FAQs",
          },
          {
            text: "Create FAQ",
            href: "#",
          },
        ]}
      />
      <AddFaq />
    </div>
  );
}
