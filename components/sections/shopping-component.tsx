"use client";
import React, {  useRef } from "react";
import { Wrapper } from "../wrapper/wrapper";
import { SelectedCategoryButtons } from "./select-category-button";
import { ProductComponent } from "./product-component";
import { ChevronRightIcon } from "@/constants/icons/chevron-right";
import { Category } from "@prisma/client";
import { IProduct } from "@/actions/get-products";

export const ShoppingComponent: React.FC<{
  categoryName: string;
  categories: Pick<Category, "id" | "name">[];
  products: IProduct[];
}> = ({ categories, categoryName, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Wrapper>
        <div className="flex md:flex-row items-center justify-between">
          <div className="md:my-0 my-6 lg:px-0 md:px-4 px-4 overflow-x-scroll scrollbar-hide">
         
            <SelectedCategoryButtons
              categories={[{ name: "All Categories", id: "1" }, ...categories]}
              initialCategoryName={categoryName}
            />
         
          </div>
          <div className="md:flex gap-x-3 md:px-0 px-4 hidden">
            <button
              onClick={() => scroll(-300)}
              className="bg-black-400 rounded-full flex items-center justify-center w-8 h-8 rotate-180"
            >
              <ChevronRightIcon color="#ffffff" />
            </button>
            <button
              onClick={() => scroll(300)}
              className="bg-black-100 w-8 h-8 flex items-center justify-center rounded-full"
            >
              <ChevronRightIcon color="#ffffff" />
            </button>
          </div>
        </div>
      </Wrapper>
      <ProductComponent products={products} ref={scrollRef} />
    </>
  );
};
