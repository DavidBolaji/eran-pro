
import { getDashboardContents, getDashboardContentsFaq } from "@/actions/get-contents";
import ContentTable from "@/components/table/content-table/content-table";
import React from "react";

import { SelectContentButtons } from "./component/select-content-buttons";
import FAQTable from "@/components/table/faqs-table/faq-table";

export const revalidate = 0;

interface ContentPageSearchParams {
  [key: string]: string;
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: ContentPageSearchParams;
}) {

  // const categories = searchParams.category?.split(",") || [];
  const status = Array.isArray(searchParams.pStat)
    ? searchParams.pStat
    : searchParams.pStat
      ? [searchParams.pStat]
      : [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";
  const searchQuery = searchParams.searchQuery || "";
  const activeTab = searchParams?.tab || "Blog Posts";

  // Fetch customer data and category list
  const blogRequest = getDashboardContents({
    status: status.map((el) => el.toUpperCase()),
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });

  // Fetch customer data and category list
  const faqRequest = getDashboardContentsFaq({
    status: status.map((el) => el.toUpperCase()),
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });

  // Await both requests
  const [data, data2] = await Promise.all([
    blogRequest,
    faqRequest
  ]);

  return (
    <div className="p-4">
      <div className="md:my-0 my-6 ml-0.5 lg:px-0 overflow-x-scroll scrollbar-hide">
        <SelectContentButtons
          content={[
            { name: "Blog Posts", id: "blogs" },
            { name: "FAQs", id: "faqs" },
          ]}
          initialContentName={activeTab}
        />
      </div>
      {activeTab !== "FAQs" ? (
        <ContentTable
          initialContent={data?.blogs ?? []}
          totalPages={data?.totalPages}
          page={page}
          itemsPerPage={limit}
        />
      ) : (
        <FAQTable
          initialContent={data2?.faqs ?? []}
          totalPages={data2?.totalPages}
          page={page}
          itemsPerPage={limit}
        />

      )}

    </div>
  );
}
