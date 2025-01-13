"use client";

import { IProduct } from "@/actions/get-products";
import { sendNotification } from "@/actions/notification";
import { PaymentOrder } from "@/app/dashboard/components/payment-order";
import { Button } from "@/components/button/button";
import { Spinner } from "@/components/spinner";
import { Order } from "@/components/table/orders-table/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,

} from "@/components/ui/select";
import { useAxios } from "@/hooks/use-axios";
import { useNotification } from "@/hooks/use-notification";
import { paystackKey } from "@/hooks/use-paystack";
import { addWeightToProducts } from "@/utils/helper";
import { OrderStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Grid } from "antd";
import { AxiosError } from "axios";
import { useRef, useState } from "react";


const { useBreakpoint } = Grid;

export default function ViewOrder({ order }: { order: Order | null }) {
  const screen = useBreakpoint();
  const Axios = useAxios()
  const queryClient = useQueryClient()
  const { toggleNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const divRef = useRef<null | HTMLDivElement>(null)
  const { mutate: handleChange } = useMutation({
    mutationKey: ['UPDATE_ORDER'],
    mutationFn: async ({ status, balance }: { status: OrderStatus, balance?: number }) => {
      setLoading(true)
      return await Axios.put('/order', { id: order?.id, status, balance })
    },
    onSuccess: async (data, variable) => {
      await sendNotification(
        `Order has been ${variable.status}`,
        order.User.id,
        undefined,
        'Order Status'
      )
      toggleNotification({
        type: "success",
        show: true,
        title: "Order Update Successfull",
        message: "Order has been updated successfully"
      })
    },
    onError: (error) => {
      console.log(error)
      toggleNotification({
        type: "error",
        show: true,
        title: "Order Update Error",
        message: (error as AxiosError<{ message: string }>).response?.data.message ?? "Something went wrong"
      })
    },
    onSettled: () => setLoading(false)
  })

  const ordersNew = addWeightToProducts(order as unknown as Order & {code: string[]});

  const calculateTotalDiscount = () => {
    if (!ordersNew || !ordersNew.products) return 0;

    return ordersNew.products.reduce((acc, prod) => {
      const nProd = prod as unknown as IProduct & { discount: number };
      const discount = nProd?.discount || 0; // Ensure weight is always a number
      // const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      return acc + discount 

    }, 0);
  };

  const totalDs = calculateTotalDiscount()

  const calculateTotal = () => {
    if (!ordersNew || !ordersNew.products) return 0;

    return ordersNew.products.reduce((acc, prod) => {
      const nProd = prod as unknown as IProduct & { weight: number };
      const weight = nProd?.weight || 0; // Ensure weight is always a number
      const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      return acc + (prod.price * weight) / stepValue;
    }, 0);
  };

  const handleUpdate = async (val: OrderStatus) => {
    const totalLeft = (calculateTotal() + 2500 - totalDs) - (order?.price ?? 0);

    if (val === "DELIVERED") {
      if ((calculateTotal() + 2500 - totalDs) === order?.price) {
        handleChange({ status: val })
        return;
      }

      queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
        amount: totalLeft * 100,
        email: order?.User?.email ?? order?.email,
        shown: true,
        publicKey: paystackKey,
        reference: Date.now().toString(),
        balance: totalLeft,
        fn: handleChange
      }));
      return;

    }
    handleChange({ status: val })
  }

  const copy = async () => {
    const totalLeft = (calculateTotal() + 2500 - totalDs) - (order?.price ?? 0);
    await window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONT}/payment?em=${order?.User?.email ?? order?.email}&tL=${totalLeft}&oId=${order?.id}`)
    toggleNotification({
      show: true,
      message: "Link coppied to clipboard",
      type: "info",
      title: "Link Copy Successfull"
    })
    if (divRef && divRef.current) {
      divRef?.current.click()
    }
    return;
  }

  return (
    <>
      <div ref={divRef} className="container mx-auto mt-6 overflow-hidden">
        {/* Header */}
        <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
          <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4">
            Order {order?.orderId}
          </h1>
          <div className="flex gap-3">
            <Button size="lg" color="light" className="h-9">
              {screen.lg ? "Cancel Order" : "Cancel"}
            </Button>
            <div className="w-auto">
              <Select defaultValue={order?.status === "PENDING" ? "" : order?.status} onValueChange={(val: OrderStatus) => handleUpdate(val)}>
                <SelectTrigger disabled={loading} className="border-0 rounded-full bg-black-100 text-white text-center ">
                  {!loading
                    ? screen.lg
                      ? "Update Order Status"
                      : "Update Status"
                    : <Spinner />
                  }

                </SelectTrigger>
                <SelectContent >
                  <div
                    className={
                      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

                    }
                    onClick={order?.status === "DELIVERED" ? () => { } : copy}>Copy</div>
                  <SelectItem disabled={order?.status === "DELIVERED"} value="DELIVERED">Completed</SelectItem>
                  <SelectItem disabled={order?.status === "DELIVERED"} value="CANCELED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </div>
      <PaymentOrder />
    </>
  );
}
