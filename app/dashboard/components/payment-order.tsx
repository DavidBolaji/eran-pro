"use client"
import PaymentComponent from "@/components/paystack/paystack";
import { paystackKey } from "@/hooks/use-paystack";
import { OrderStatus } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

interface PaystackModalData {
  amount: number;
  email: string;
  shown: boolean;
  publicKey: string;
  reference: string;
  balance: number;
  fn: (params: { status: OrderStatus; balance: number }) => void;
}

export const PaymentOrder = () => {
  const queryClient = useQueryClient();

  return (
    <PaymentComponent
      onSuccess={async () => {
        // Fetch existing data from the query cache
        const data = queryClient.getQueryData<PaystackModalData>(["PAYSTACK_MODAL"]);

        if (data) {
          // Reset the query data to default values
          queryClient.setQueryData(["PAYSTACK_MODAL"], {
            amount: 0, // Set to 0 (already in kobo, no need to multiply by 100)
            email: "",
            shown: false,
            publicKey: paystackKey,
            reference: data.reference,
            balance: data.balance, // Retain balance (or calculate if needed)
            fn: data.fn, // Preserve the existing function
          });

          // Call the callback function with status and updated balance
          data.fn({ status: "DELIVERED", balance: data.balance });
        }
      }}
    />
  );
};
