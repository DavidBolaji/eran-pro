// ProductTable.tsx
"use client";

import * as React from "react";

import { Table, TableBody } from "@/components/ui/table";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { filterCustomerOrder } from "@/actions/get-customers";
import { Empty } from "antd";
import Pagination from "../pagination";
import { Content, ContentTableProps } from "./types";
import ContentTableHeader from "./content-table-header";
import { filterContent } from "@/actions/get-contents";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { BlogCategory } from "@prisma/client";
import ContentTableRow from "./content-table-row";

export default function ContentTable({
  initialContent,
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: ContentTableProps) {
  const { toggleModal } = useDeleteModal()
  const {
    items,
    handleSort,
    sortColumn,
    sortDirection,
    showFilters,
    ref,
    loading,
    handleSearch,
    deleteMultiple,
    toggleSelectAll,
    allChecked,
    selectedItems,
    setShowFilters,
    toggleSelectItem
  } = useTable<Content>({
    initialItems: initialContent as Content[],

    onSort,
    onFilter(form, params) {
      filterContent(
        form,
        params,
      );
    },
    onSearch(form, params) {
      filterContent(form, params)
    },
    async onDeleteMany(data) {
      
      toggleModal(true, "DELETE_BLOGS", data)
    },
  });

  return (
    <div className="w-full mt-6 scrollbar-hide">
      <MainHeader
        title={"Blog Posts"}
        name={"Create Blog Post"}
        url={"/dashboard/contents/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        handleSearch={handleSearch}
        action={deleteMultiple}
        placeholder="Search blog by title"
        onFilter={(form, params) =>
          filterContent(
            form,
            params
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
            {items.map((blog: Content) => (
              <ContentTableRow key={blog.id} blog={blog as Content & { blogCategory: BlogCategory } & { user: { fname: string } }}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                deleteOne={(data) => toggleModal(true, "DELETE_BLOGS", data)}
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
