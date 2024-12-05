"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const paymentOptions = [
  {
    key: "Debit card",
    name: "PAYSTACK (Debit Card)",
  },
  {
    key: "Pay on delivery",
    name: "Complete payment on delivery",
    subtitle: "At least 25% of the total amount must be paid now",
  },
];

export const PaymentMethod = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState("PAYSTACK (Debit Card)");


  useEffect(() => {
    const paymentFlow = paymentOptions.find(el => el.name === selected);
    queryClient.setQueryData(['PAYMENT_FLOW'], paymentFlow?.key)
  }, [selected, queryClient])

  return (
    <div className="space-y-4">
      {paymentOptions.map((option) => (
        <div
          key={option.name}
          className="flex items-start cursor-pointer"
          onClick={() => setSelected(option.name)}
        >
          {/* Custom Radio Button */}
          <div className="mr-3 mt-1">
            <input
              type="radio"
              name="paymentMethod"
              value={option.name}
              checked={selected === option.name}
              onChange={() => setSelected(option.name)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === option.name
                  ? "border-white bg-white"
                  : "border-[#6E8C7B] bg-black-300"
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-black-100"></div>
            </div>
          </div>

          {/* Label and Subtitle */}
          <div className="mt-1">
            <div className="text-white text-[16px] font-medium leading-5">
              {option.name}
            </div>
            {option.subtitle && (
              <div className="text-sm text-gray-400">{option.subtitle}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
