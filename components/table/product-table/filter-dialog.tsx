"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { X } from "lucide-react";
import React, { useRef } from "react";
import { FilterCollapse } from "./filter-collapse";
import { filterProduct, resetProduct } from "@/actions/get-products";
import { useSearchParams } from "next/navigation";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterDialog({ open, onClose }: FilterDialogProps) {
  const searchParams = useSearchParams();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isChecked = (name: string, value: string) => {
    const paramValues = searchParams.get(name)?.split(",");
    return paramValues?.includes(value) || false;
  };

  

  return open ? (
    <div className="flex items-start justify-center pt-12">
      <div className="bg-white rounded-lg shadow-lg px-6 w-[372px]">
        <div className="flex items-center pb-2 justify-between pt-6">
          <h2 className="font-semibold pl-0.5">Manage Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <FilterCollapse
          data={[
            {
              key: "1",
              label: "Categories",
              children: (
                <form
                  action={(formData) => filterProduct(formData, searchParams)}
                  className="pt-2"
                >
                  <div className="">
                    <div className="">
                      {["Chicken", "Cow", "Goat"].map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2 space-y-2"
                        >
                          <Checkbox
                            className="mt-2"
                            id={category.toLowerCase()}
                            name="Categories[]"
                            value={category}
                            defaultChecked={isChecked(`category`, category)}
                          />
                          <label
                            htmlFor={category.toLowerCase()}
                            className="font-bold font-satoshi text-sm leading-5 black-100"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="hidden" type="submit" ref={btnRef} />
                </form>
              ),
            },
          ]}
        />
        <div className=" my-6 rounded-b-lg flex items-center justify-between gap-2">
          <form action={() => {
            onClose()
            resetProduct()
            }}>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="rounded-full border-0 bg-black-600"
            >
              Reset
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => btnRef.current?.click()}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
