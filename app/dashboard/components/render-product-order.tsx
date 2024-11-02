import React from "react";
import { SideCards } from "./side-cards";
import FilterComponent from "./filter-component";
import { Typography } from "@/components/typography/typography";
import PendingOrdersTable from "@/components/table/pending-orders/pending-orders-table";

export const RenderProductOrder = () => {
  return (
    <div className="grid grid-cols-12 gap-x-6 mt-6">
      <div className="col-span-8">
        <PendingOrdersTable />
      </div>
      <div className="col-span-4">
        <SideCards
          title="Popular order weights"
          filter={<FilterComponent />}
          body={
            <div className="">
              {[
                { weight: 1, order: 500 },
                { weight: 2, order: 129 },
                { weight: 0.5, order: 110 },
              ]?.map((data) => (
                <div className="flex justify-between items-center h-14 py-4 border-b border-[#DDEEE5]">
                  <Typography as="p" size="s1" align="left" className="mb-2">
                    {data.weight}kg
                  </Typography>
                  <Typography
                    as="p"
                    size="c1"
                    align="left"
                    className="tracking-tighter font-bold border-[#23342A] border inline-block px-2 rounded-2xl"
                  >
                    {data.order} orders
                  </Typography>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};
