"use client";

import { Button } from "@/components/button/button";
import { Badge } from "@/components/ui/badge";
import { Button as ShadButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Filter, Plus, Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef } from "react";
import FilterDialog from "./product-table/filter-dialog";
import { useOverlay } from "@/hooks/use-overlay";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Grid } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const { useBreakpoint } = Grid;

interface MainHeaderProps {
  search?: boolean;
  filter?: boolean;
  more?: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowFilters?: Dispatch<SetStateAction<boolean>>;
  showFilters?: boolean;
  payment?: boolean;
  status?: boolean;
  pType?: boolean;
  pStatus?: boolean;
  url?: string;
  name?: string;
  title: string;
  categories?: Pick<Category, "id" | "name">[];
  calender?: boolean;
  onFilter: (form: FormData, params: URLSearchParams, path?: string) => void;
  action?: () => void;
  placeholder?: string
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  search = false,
  filter = false,
  more = false,

  payment = false,
  status = false,
  pType = false,
  pStatus = false,
  handleSearch,
  url,
  name,
  title,
  categories,
  calender = false,
  onFilter,
  action,
  placeholder
}) => {
  const divRef = useRef<null | HTMLButtonElement>(null);
  const { toggleOverlay } = useOverlay();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screen = useBreakpoint();
  const queryClient = useQueryClient();

  const { data: showFilters } = useQuery({
    queryKey: ['FILTER_OPEN'],
    queryFn: () => queryClient.getQueryData(['FILTER_OPEN']) ?? false as boolean
  })

  const openFilter = () => {
    toggleOverlay(true);
    queryClient.setQueryData(['FILTER_OPEN'], true)
    // setShowFilters!(true);
  };

  const closeFilter = () => {
    toggleOverlay(false);
    queryClient.setQueryData(['FILTER_OPEN'], false)
    // setShowFilters!(false);
  };

  const handleDelete = () => {
    if (action) {
      queryClient.setQueryData(["OVERLAY"], () => true);
      action()
    }
  }

  return (
    <div className="lg:pb-6 pt-2 bg-white border-b rounded-t-2xl">
      <div className="flex lg:flex-row flex-col  items-center lg:justify-between pt-5 mb-6">
        <h1
          className={`text-2xl  px-6 font-semibold  lg:w-auto w-full lg:mb-0 mb-4 text-nowrap ${screen.lg ? "" : "border-b pb-4"
            }`}
        >
          {title}
        </h1>
        <div className="flex  px-6  lg:w-auto w-full items-center justify-start lg:justify-between gap-4">
          {search && (
            <div className="relative lg:min-w-[354px] md:block hidden">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholder ?? "Search for product"}
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
                {screen.lg ? "Filter" : null}
                <Badge
                  variant="secondary"
                  className="ml-1 text-white bg-lemon hover:bg-lemon rounded-full"
                >
                  {(searchParams.getAll("category")?.length || 0) +
                    (searchParams.getAll("status")?.length || 0) +
                    (searchParams.getAll("pStat")?.length || 0) +
                    (searchParams.getAll("promoT")?.length || 0) +
                    (searchParams.getAll("payment")?.length || 0)}
                </Badge>
              </ShadButton>
              <div
                className={`absolute top-0 ${status ? "-right-1/4 -translate-x-8" : ""
                  } z-10`}
              >
                <FilterDialog
                  open={showFilters as boolean}
                  onClose={closeFilter}
                  categories={categories}
                  calender={calender}
                  onFilter={onFilter}
                  payment={payment}
                  status={status}
                  pStatus={pStatus}
                  pType={pType}
                />
              </div>
            </div>
          )}
          {more && (
            <Select >
              <SelectTrigger ref={divRef} className="w-32 rounded-full">
                More Action
                {/* <SelectValue placeholder="More Actions" /> */}
                {/* <SelectValue placeholder="More Actions" defaultValue={"More Actions"} /> */}
              </SelectTrigger>
              <SelectContent>
                <span className="p-2 hover:bg-green-500/10 cursor-pointer text-sm font-satoshi inline-block" onClick={handleDelete}>Delete Selected</span>
              </SelectContent>
            </Select>
          )}

          {name && (
            <Button
              className="h-9 flex items-center justify-center"
              size="lg"
              color="dark"
              type="button"
            >
              <div
                onClick={() => router.push(url ?? "#")}
                className="text-white hover:text-white flex gap-2 items-center"
              >
                {screen.lg ? name : null}
                <span className="border border-white rounded-full h-5 w-5 flex items-center justify-center">
                  <Plus className="h-4 w-4" color="white" />
                </span>
              </div>
            </Button>
          )}
        </div>
        {search && (
          <div className="relative px-6 lg:min-w-[154px] md:hidden block mt-5 w-full">
            <Search className="absolute left-9 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              // placeholder={placeholder ?? "Search for product"}
              className="pl-8 rounded-full"
              onChange={handleSearch}
            />
          </div>
        )}
      </div>
    </div >
  );
};
