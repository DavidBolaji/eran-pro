"use client";

import { selectContent } from "@/actions/get-contents";
import { Button } from "@/components/button/button";
import React, { useState } from "react";


interface Content {
  id: string;
  name: string;
}

interface Props {
  content: Content[];
  initialContentName: string;
}

export const SelectContentButtons: React.FC<Props> = ({
  content,
  initialContentName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialContentName);

  const handleClick = async (
    e: React.FormEvent<HTMLFormElement>,
    content: Content
  ) => {
    e.preventDefault();
    setSelectedCategory(content.name);

    // Submit the form to trigger server-side action
    const formData = new FormData(e.currentTarget);
    selectContent(formData);
  };

  return (
    <div className="flex gap-x-2.5">
      {content.map((content) => (
        <form
          key={content?.id}
          onSubmit={(e) => handleClick(e, content)}
          method="post"
        >
          {/* <input type="hidden" name="Customer" value={customer.key} /> */}
          <input type="hidden" name="Tab" value={content.name} />
          <Button
            type="submit"
            round={false}
            size="lg"
            color={selectedCategory === content.name ? "dark" : "light"}
            className="inline-block text-nowrap text-[14px]  h-12 rounded-2xl md:px-6 px-3 text-xs"
          >
            <span className="font-bold">{content.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
};
