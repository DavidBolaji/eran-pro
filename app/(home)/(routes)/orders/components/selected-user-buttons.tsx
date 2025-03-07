"use client";

import { selectUser } from "@/actions/get-customers";
import { Button } from "@/components/button/button";
import React, { useState } from "react";


interface Customer {
  id: string;
  name: string;
  key: string
}

interface Props {
  customers: Customer[];
  initialCustomerName: string;
  onTabChange?: (customerName: string) => void;
}

export const SelectedUserButtons: React.FC<Props> = ({
  customers,
  initialCustomerName,
  onTabChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCustomerName);

  const handleClick = async (
    e: React.FormEvent<HTMLFormElement>,
    customer: Customer
  ) => {
    e.preventDefault();
    setSelectedCategory(customer.name);
    
    // Notify parent component about tab change
    onTabChange?.(customer.name);

    // Submit the form to trigger server-side action
    const formData = new FormData(e.currentTarget);
    selectUser(formData);
  };

  return (
    <div className="flex gap-x-2.5">
      {customers.map((customer) => (
        <form
          key={customer.id}
          onSubmit={(e) => handleClick(e, customer)}
          method="post"
        >
          <input type="hidden" name="User" value={customer.key} />
          <input type="hidden" name="Tab" value={customer.name} />
          <Button
            type="submit"
            round={false}
            size="lg"
            color={selectedCategory === customer.name ? "dark" : "light"}
            className="inline-block text-nowrap text-[14px] h-12 rounded-2xl md:px-6 px-3 text-xs"
          >
            <span className="font-bold">{customer.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
};
