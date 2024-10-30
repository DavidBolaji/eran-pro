"use client";
import React, { useState } from "react";

const paymentOptions = [
  {
    name: "PAYSTACK (Debit Card)",
  },
  {
    name: "FLUTTERWAVE (Debit Card)",
  },
  {
    name: "Complete payment on delivery",
    subtitle: "At least 25% of the total amount must be paid now",
  },
];

export const PaymentMethod = () => {
  const [selected, setSelected] = useState("PAYSTACK (Debit Card)");

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
            <div className="text-white text-base font-medium leading-5">
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
