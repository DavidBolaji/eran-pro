// SelectedCategoryButtons.tsx
"use client";

import React, { useState } from "react";
import { Button } from "../button/button";
import { selectCategory } from "@/actions/get-categories";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  initialCategoryName: string;
}

export const SelectedCategoryButtons: React.FC<Props> = ({
  categories,
  initialCategoryName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryName);

  const handleClick = async (
    e: React.FormEvent<HTMLFormElement>,
    category: Category
  ) => {
    e.preventDefault();
    setSelectedCategory(category.name);

    // Submit the form to trigger server-side action
    const formData = new FormData(e.currentTarget);
    await selectCategory(formData);
  };

  return (
    <div className="flex gap-x-2.5">
      {categories.map((category) => (
        <form
          key={category.id}
          onSubmit={(e) => handleClick(e, category)}
          method="post"
        >
          <input type="hidden" name="Category" value={category.id} />
          <input type="hidden" name="Name" value={category.name} />
          <Button
            type="submit"
            round={false}
            size="lg"
            color={selectedCategory === category.name ? "dark" : "light"}
            className="inline-block text-nowrap text-[14px]  h-12 rounded-2xl md:px-6 px-3 text-xs"
          >
            <span className="font-bold">{category.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
};
