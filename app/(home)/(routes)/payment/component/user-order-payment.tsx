"use client"
import PaymentComponent from "@/components/paystack/paystack";
import { useAxios } from "@/hooks/use-axios";
import { useNotification } from "@/hooks/use-notification";
import { paystackKey } from "@/hooks/use-paystack";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaystackModalData {
  amount: number;
  email: string;
  shown: boolean;
  publicKey: string;
  reference: string;
}

export const UserOrderPayment:React.FC<{email: string, total: number, orderId: string}> = ({email, total, orderId}) => {
  const queryClient = useQueryClient();
  const Axios = useAxios()
  const {toggleNotification} = useNotification()
  const router = useRouter()

  useEffect(() => {
    queryClient.setQueryData(["PAYSTACK_MODAL"], {
        amount: total * 100, // Set to 0 (already in kobo, no need to multiply by 100)
        email,
        shown: true,
        publicKey: paystackKey,
        reference: Date.now().toString(),
      });
  }, [email, queryClient, total])

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
          });

          // Call the callback function with status and updated balance
          await Axios.put('/order/user', {status: "DELIVERED", balance: total, id: orderId})
          router.push('/')
          toggleNotification({
            type: "success",
            title: "Order Payment completed",
            message: "Your order payment has been completed successfully",
            show: true
          })
          
        }
      }}
    />
  );
};
