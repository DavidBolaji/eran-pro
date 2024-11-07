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
import FilterDialog from "./product-table/filter-dialog";
import { useOverlay } from "@/hooks/use-overlay";
import { useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Grid } from "antd";
const {useBreakpoint} = Grid;

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
  categories?: Pick<Category, "id" | "name">[]

}

export const MainHeader: React.FC<MainHeaderProps> = ({
  search = false,
  filter = false,
  more = false,
  showFilters = false,
  handleSearch,
  setShowFilters,
  url,
  name,
  title,
  categories
}) => {
  const divRef = useRef<null | HTMLButtonElement>(null);
  const {toggleOverlay} = useOverlay()
  const searchParams = useSearchParams()
  const screen = useBreakpoint();


  const openFilter = () => {
    toggleOverlay(true)
    setShowFilters!(true)
  }

  const closeFilter = () => {
    toggleOverlay(false)
    setShowFilters!(false)
  }

  return (
    <div className="lg:pb-6 pt-2 bg-white border-b rounded-t-2xl">
      <div className="flex lg:flex-row flex-col  items-center lg:justify-between pt-5 mb-6">
        <h1 className={`text-2xl  px-6 font-semibold  lg:w-auto w-full lg:mb-0 mb-4 text-nowrap ${screen.lg ? "": "border-b pb-4"}`}>{title}</h1>
        <div className="flex  px-6  lg:w-auto w-full items-center justify-start lg:justify-between gap-4">
          {search && (
            <div className="relative lg:min-w-[154px] md:block hidden">
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
                {screen.lg ? 'Filter': null}
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
                  categories={categories}
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
              {screen.lg ? name: null}
              <span className="border border-white rounded-full h-5 w-5 flex items-center justify-center">
                <Plus className="h-4 w-4" color="white" />
              </span>
            </Link>
          </Button>
        </div>
        {search && (
            <div className="relative px-6 lg:min-w-[154px] md:hidden block mt-5 w-full">
              <Search className="absolute left-9 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for product"
                className="pl-8 rounded-full"
                onChange={handleSearch}
              />
            </div>
          )}
      </div>
    </div>
  );
};
