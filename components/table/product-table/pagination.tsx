import { Button } from "@/components/ui/button";
import React from "react";
import { filterProduct } from "@/actions/get-products";
import { useSearchParams } from "next/navigation";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

const Pagination = React.forwardRef<
  HTMLDivElement,
  {
    isMobile: boolean;
    loading: boolean;
    totalPages: number;
    page: number;
    itemsPerPage: number;
  }
>(({ isMobile, loading, page, totalPages, itemsPerPage }, ref) => {
  const searchParams = useSearchParams();

  const handlePageSubmit =
    (newPage: number) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      filterProduct(new FormData(), params);
    };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showAround = 1; // Number of pages to show around current page

    // Always show first page
    pageNumbers.push(1);

    if (page > 3) {
      pageNumbers.push("ellipsis1");
    }

    // Add pages around current page
    for (
      let i = Math.max(2, page - showAround);
      i <= Math.min(totalPages - 1, page + showAround);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 2) {
      pageNumbers.push("ellipsis2");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalPages);
  const totalItems = Math.ceil(totalPages / itemsPerPage)

  return (
    <div>
      {!isMobile && (
        <div className="flex items-center justify-between px-2 py-4 mt-4">
          <form
            onSubmit={handlePageSubmit(page - 1)}
            className="flex items-center cursor-pointer"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              type="submit"
              className="rounded-full mr-2 bg-black-300 border-0 w-8 h-8"
            >
              <CaretLeftIcon color="white" className="w-4 h-4" />
            </Button>
            <span className="font-bold text-sm black-300">Previous</span>
          </form>

          <div className="flex items-center gap-2">
            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === "ellipsis1" || pageNum === "ellipsis2") {
                return (
                  <span key={pageNum} className="w-8 text-center">
                    ...
                  </span>
                );
              }

              return (
                <form
                  key={index}
                  onSubmit={handlePageSubmit(pageNum as number)}
                >
                  <Button
                    size="sm"
                    className={`w-8 rounded-full hover:text-white font-bold text-sm text-black 
                      ${
                        pageNum === page
                          ? "bg-grey-100"
                          : "bg-transparent shadow-none border-0"
                      }`}
                    type="submit"
                  >
                    {pageNum}
                  </Button>
                </form>
              );
            })}
            <div className="text-sm text-gray-600 text-right">
              Showing {startItem} - {endItem} of {totalItems}
            </div>
          </div>

          <form
            onSubmit={handlePageSubmit(page + 1)}
            className="flex items-center cursor-pointer"
          >
            <span className="font-bold text-sm black-300">Next</span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              type="submit"
              className="rounded-full ml-2 bg-black border-0 w-8 h-8"
            >
              <CaretRightIcon color="white" className="w-8 h-8" />
            </Button>
          </form>
        </div>
      )}
      {isMobile && (
        <div
          ref={ref}
          className="py-4 text-center text-sm text-muted-foreground"
        >
          {loading ? "Loading more..." : "Load more"}
        </div>
      )}
    </div>
  );
});

Pagination.displayName = "Pagination";
export default Pagination;
