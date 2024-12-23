"use client";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-styles.css"; // Add a custom stylesheet for additional styles
import { isEmpty } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { Blog } from "@prisma/client";

export const WYSIWYGForm: React.FC<{ text?: string }> = ({ text }) => {
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient()
  const isEdit = isEmpty(text) 

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link", "image"], // Link and image buttons

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Lists
    [
      { align: "" }, // Left-align
      { align: "center" }, // Center-align
      { align: "right" }, // Right-align
      { align: "justify" }, // Justify-align
    ],
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
  ];

  const modules = {
      toolbar:  toolbarOptions,
  };

  useEffect(() => {
    if(text) {
        setContent(text)
    }
  }, [])

  useEffect(() => {
    console.log('trigger', content);
    
    queryClient.setQueryData([!isEdit ? "EDIT_BLOG" : "CREATE_BLOG"], (old: Blog) =>
        old
          ? {
            ...old,
            text: content,
          }
          : {
            text: content,
          }
      );
  }, [content])

  return (
    <div className="editor-container rounded-t-2xl border border-[#DDEEE5]">
      <div className="black-100 bg-white font-bold border-b border-[#DDEEE5] font-satoshi text-[16px] py-6 px-4  rounded-t-2xl">Blog Content</div>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={(e) => setContent(e)}
      />
    </div>
  );
};
