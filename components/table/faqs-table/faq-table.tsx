// ProductTable.tsx
"use client";

import * as React from "react";

import { Table, TableBody } from "@/components/ui/table";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";

import { filterCustomerOrder } from "@/actions/get-customers";
import { Empty } from "antd";
import Pagination from "../pagination";
import { Content, ContentFaqTableProps } from "./types";
import ContentTableHeader from "./faq-table-header";
import { filterContentFaq } from "@/actions/get-contents";
import { useDeleteModal } from "@/hooks/use-delete-modal";

import ContentTableRow from "./faq-table-row";

export default function FAQTable({
  initialContent,
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: ContentFaqTableProps) {
  const { toggleModal } = useDeleteModal()
  const {
    items,
    handleSort,
    sortColumn,
    sortDirection,
    showFilters,
    setShowFilters,
    isMobile,
    ref,
    loading,
    handleSearch,
    deleteMultiple,
    toggleSelectAll,
    allChecked,
    selectedItems,
    toggleSelectItem
  } = useTable<Content>({
    initialItems: initialContent as Content[],
    onSort,
    onFilter(form, params) {
      filterContentFaq(
        form,
        params,
        "/dashboard/contents?tab=FAQs"
      );
    },
    onSearch(form, params) {
      filterContentFaq(form, params, "/dashboard/contents?tab=FAQs")
    },
    async onDeleteMany(data) {
      toggleModal(true, "DELETE_FAQS", data)
    },
  });

  return (
    <div className="w-full mt-6 scrollbar-hide">
      <MainHeader
        title={"FAQs"}
        name={"Create FAQ"}
        url={"/dashboard/contents/faq/add"}
        placeholder="Search FAQ by title"
        calenderTxt="Date Range"

        setShowFilters={setShowFilters}
        showFilters={showFilters}
        handleSearch={handleSearch}
        action={deleteMultiple}
        onFilter={(form, params) =>
          filterContentFaq(
            form,
            params,
            "/dashboard/contents?tab=FAQs"
          )
        }

        filter
        search
        more
        calender
        post
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border relative border-[#DDEEE5]">
        <Table>
          <ContentTableHeader
            toggleSelectAll={toggleSelectAll}
            allChecked={allChecked}
            handleSort={handleSort}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
          />
          <TableBody>
            {items.map((faq: Content) => (
              <ContentTableRow key={faq.id} faq={faq as Content}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                deleteOne={(data) => toggleModal(true, "DELETE_FAQS", data)}
              />
            ))}
          </TableBody>
        </Table>
        {items.length < 1 && (
          <div className="py-8">
            <Empty />
          </div>
        )}
      </div>
      <Pagination
        ref={ref}
        isMobile={false}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterCustomerOrder}
      />
    </div>
  );
}
