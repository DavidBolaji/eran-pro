"use client"
import React from "react";
import { Typography } from "../../typography/typography";
import { ChevronDownIcon } from "@/constants/icons/chevron-down";
import { useRouter } from "next/navigation";

const categories = [
  { id: "1", name: "Chicken" },
  { id: "2", name: "Goat" },
  { id: "3", name: "Cow" },
  { id: "5", name: "Blog" },
];

export const Categories = () => {
  const router = useRouter();
  const handleClick = async (key: string) => {
    if (key === "Blog") {
      return router.push('/blog')
    }
    return router.push('/#orders')
  }
  const categoriesList = categories.map((category, index) => (
    <Typography key={category.id} size="s1" align="center" as="p">
      <span
        onClick={() => handleClick(category.name)}
        className={`flex items-center cursor-pointer gap-2 ${index < categories.length - 1 && "pr-6 border-black-100 border-r leading-[1px]"
          }`}
      >
        {category.name}
        {category.name !== "Blog" ? <ChevronDownIcon size="16" /> : null}

      </span>
    </Typography>
  ));
  return categoriesList;
};
