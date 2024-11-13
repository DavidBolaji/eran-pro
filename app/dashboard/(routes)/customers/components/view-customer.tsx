"use client";

import { IUser } from "@/actions/get-customers";
import { CustomerTitleHeader } from "@/components/dashboard-header/customer-header";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";

export default function ViewCustomer({
  customer,
  save = false,
}: {
  customer: IUser | null;
  save?: boolean;
}) {
  const router = useRouter();

  const action = () => {
    if (!save) {
      return router.push(`/dashboard/customers/${customer?.id}/edit`);
    }

    //update user
  };

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <CustomerTitleHeader
        title={`${customer?.fname} ${customer?.lname}`}
        discardKey="ADD_PRODUCT"
        addItem={action}
        save={save}
      />
    </div>
  );
}
