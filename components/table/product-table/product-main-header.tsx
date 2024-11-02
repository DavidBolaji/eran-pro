"use client";

import { Button } from "@/components/button/button";
import { Badge } from "@/components/ui/badge";
import { Button as ShadButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useRef } from "react";
import FilterDialog from "./filter-dialog";
import { useOverlay } from "@/hooks/use-overlay";
import { useSearchParams } from "next/navigation";

interface MainHeaderProps {
  search?: boolean;
  filter?: boolean;
  more?: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowFilters?: Dispatch<SetStateAction<boolean>>;
  showFilters?: boolean;
  url: string;
  name: string;
  title: string;
}

export const ProductMainHeader: React.FC<MainHeaderProps> = ({
  search = false,
  filter = false,
  more = false,
  showFilters = false,
  handleSearch,
  setShowFilters,
  url,
  name,
  title,
}) => {
  const divRef = useRef<null | HTMLButtonElement>(null);
  const {toggleOverlay} = useOverlay()
  const searchParams = useSearchParams()

  const openFilter = () => {
    toggleOverlay(true)
    setShowFilters!(true)
  }

  const closeFilter = () => {
    toggleOverlay(false)
    setShowFilters!(false)
  }

  return (
    <div className="pb-6 px-4 pt-2 bg-white border-b rounded-t-2xl">
      <div className="flex items-center justify-between pt-5 px-6 mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center justify-between gap-4">
          {search && (
            <div className="relative flex-1 min-w-[304px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for product"
                className="pl-8 rounded-full"
                onChange={handleSearch}
              />
            </div>
          )}
          {filter && (
            <div className="relative">
              <ShadButton
                variant="outline"
                onClick={openFilter}
                className="gap-2 border-0 bg-black-600 rounded-full relative z-20"
              >
                <Filter className="h-4 w-2" />
                Filters
                <Badge
                  variant="secondary"
                  className="ml-1 text-white bg-lemon hover:bg-lemon rounded-full"
                >
                  {searchParams.get('category')?.split(",")?.length ?? 0}
                </Badge>
              </ShadButton>
              <div className="absolute top-0 z-10">
                <FilterDialog
                  open={showFilters}
                  onClose={closeFilter}
                />
              </div>
            </div>
          )}
          {more && (
            <Select>
              <SelectTrigger ref={divRef} className="w-32 rounded-full">
                <SelectValue placeholder="More Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete Selected</SelectItem>
                <SelectItem value="archive">Archive Selected</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button
            className="h-9 flex items-center justify-center"
            size="lg"
            color="dark"
            type="button"
          >
            <Link
              href={url}
              className="text-white hover:text-white flex gap-2 items-center"
            >
              {name}
              <span className="border border-white rounded-full h-5 w-5 flex items-center justify-center">
                <Plus className="h-4 w-4" color="white" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
