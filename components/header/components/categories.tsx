import React from "react";
import { Typography } from "../../typography/typography";
import { ChevronDownIcon } from "@/constants/icons/chevron-down";

const categories = [
  { id: "1", name: "Chicken" },
  { id: "2", name: "Goat" },
  { id: "3", name: "Cow" },
];

export const Categories = () => {
  const categoriesList = categories.map((category, index) => (
    <Typography key={category.id} size="s1" align="center" as="p">
      <span
        className={`flex items-center gap-2 ${
          index < categories.length - 1 && "pr-6 border-black-100 border-r leading-[1px]"
        }`}
      >
        {category.name}
        <ChevronDownIcon size="16" />
        
      </span>
    </Typography>
  ));
  return categoriesList;
};
