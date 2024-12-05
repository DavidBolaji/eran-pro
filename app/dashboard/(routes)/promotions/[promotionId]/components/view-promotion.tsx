"use client";

import { Button } from "@/components/button/button";

import { Promotion } from "@prisma/client";



export default function ViewPromotion({ promotion }: { promotion: Promotion | null }) {
 
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
        <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4">
         {promotion?.name}
        </h1>
        <div className="flex gap-3">
          <Button size="lg" color="light" className="h-9">
            Stop Promotion
          </Button>
          <div className="w-auto">
          <Button size="lg" color="dark" className="h-9">
            Edit Promotion
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
