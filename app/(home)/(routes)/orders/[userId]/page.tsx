import { Crumb } from "@/components/crumb/crumb";
import React from "react";
import { UserDetailComponent } from "../components/user-detail-component";
import { getDashboardCustomer } from "@/actions/get-customers";
import Link from "next/link";

interface HomeOrdersPageProps {
  params: { userId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function HomeOrdersPage({
  params,
  searchParams,
}: HomeOrdersPageProps) {
  console.log(params);
  const customerId = params.userId;
  const customerRequest = getDashboardCustomer(customerId);
  const custormerName = searchParams?.tab;

  // Await both requests
  const [customer] = await Promise.all([customerRequest]);
  return (
    <div className="pb-20">
      <div className="py-10 lg:px-0 px-4 flex md:flex-row flex-col md:justify-between justify-center items-center">
        <Crumb
          crumbData={[
            {
              text: "Home",
              href: "/",
            },
            {
              text: "Profile",
              href: "",
            },
          ]}
        />
        <Link
          href={`/orders/${customerId}/edit`}
          className="bg-transparent md:mt-0 mt-8 text-center md:w-auto w-full border border-[#23342A] rounded-full text-nowrap px-4 py-2 text-sm font-satoshi"
        >
          Edit Details
        </Link>
      </div>
      <UserDetailComponent
        customerName={custormerName ? custormerName : "Details"}
        customer={customer.customer}
      />
    </div>
  );
}
