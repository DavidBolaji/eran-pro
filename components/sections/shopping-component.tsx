"use client";
import React, {  useRef } from "react";
import { Wrapper } from "../wrapper/wrapper";
import { SelectedCategoryButtons } from "./select-category-button";
import { ProductComponent } from "./product-component";
import { ChevronRightIcon } from "@/constants/icons/chevron-right";
import { Category } from "@prisma/client";
import { IProduct } from "@/actions/get-products";
// import { useSearchParams } from "next/navigation";



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
        <div className="flex justify-between">
          <div>
            <SelectedCategoryButtons
              categories={[{ name: "All Categories", id: "1" }, ...categories]}
              initialCategoryName={categoryName}
            />
          </div>
          <div className="flex gap-3">
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