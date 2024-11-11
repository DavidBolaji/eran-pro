"use client";



import { IUser } from "@/actions/get-customers";
import { CustomerTitleHeader } from "@/components/dashboard-header/customer-header";

// import { useRouter } from "next/navigation";

export default function ViewCustomer({customer}: {customer: IUser | null}) {

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <CustomerTitleHeader
        title={`${customer?.fname} ${customer?.lname}`}
        discardKey="ADD_PRODUCT"
        addItem={() => {}}
      />

    </div>
  );
}
