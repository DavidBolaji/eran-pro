import { Crumb } from "@/components/crumb/crumb";
import React from "react";
import { getDashboardCustomer } from "@/actions/get-customers";
import { EditCustomerForm } from "@/components/form/edit-customer-form";
import { UserUploadComponent } from "../../components/user-upload-component";
import { SaveUserButton } from "./component/save-user-button";

interface UserEditPageProps {
  params: { userId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function UserEditPage({ params }: UserEditPageProps) {
  console.log(params);
  const customerId = params.userId;
  const customerRequest = getDashboardCustomer(customerId);

  // Await both requests
  const [customer] = await Promise.all([customerRequest]);
  return (
    <div className="pb-20 lg:px-0 px-4">
      <div className="py-10 lg:px-0 px-4 flex md:flex-row flex-col items-center">
        <Crumb
          crumbData={[
            {
              text: "Home",
              href: "/",
            },
            {
              text: "Profile",
              href: `/orders/${customerId}`,
            },
            {
              text: "Edit details",
              href: `#`,
            },
          ]}
        />
        <SaveUserButton />
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="lg:col-span-7 col-span-12">
  
          <EditCustomerForm
            user={customer.customer}
            address={customer.customer?.orderAddress ?? []}
          />
        </div>
        <div className="lg:col-span-5 col-span-12 lg:block hidden">
          <div className="bg-white px-4 py-6 rounded-2xl">
            <UserUploadComponent view />
          </div>
        </div>
      </div>
    </div>
  );
}
