"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Address } from "@prisma/client";

import { Card } from "@/components/ui/card";
import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/button/button";
import { EditCustomerForm } from "@/components/form/edit-customer-form";
import { EmptyCart } from "@/components/empty/empty-cart";
import { CartOrderCard } from "@/components/card/cart-order-card";

import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { useCartData } from "@/hooks/use-cart-data";
import { useCartDashboardDrawer } from "@/hooks/use-cart-dashboard-drawer";

import { IProduct } from "@/actions/get-products";
import { IUser } from "@/actions/get-customers";
import { createOrderSchema } from "@/components/form/validation";

export default function AddOrders() {
  const { toggleNotification } = useNotification();
  const { toggleDrawer, cartDrawer } = useCartDashboardDrawer();
  const { cartData } = useCartData();
  const queryClient = useQueryClient();
  const Axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [key, setkey] = useState(0);

  const discard = () => {
    queryClient.setQueryData(["EDIT_CUSTOMER"], () => null);
    queryClient.setQueryData(["CART_DATA"], () => []);
    setkey(prev => prev + 1)
  };

  const { mutate } = useMutation({
    mutationKey: ["EDIT_CUSTOMER"],
    mutationFn: async () => {
      setLoading(true);
      const data = queryClient.getQueryData(["EDIT_CUSTOMER"]) as IUser & { address: Address[] };
      const newData =  {
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        phone: data.phone,
        country: data.address[0]?.country,
        state: data.address[0]?.state,
        city: data.address[0]?.city,
        address: data.address[0]?.address,
        orders: cartData,
        paymentType: "Pay on delivery",
        price: 0,
        active: true
        
      }
      try {
        // Validate data
        await createOrderSchema.validate(newData);

        // Make API request
        await Axios.post("/ordersusers/no-create", newData);

        toggleNotification({
          show: true,
          title: "Order Created",
          type: "success",
          message: "Order has been created successfully",
        });
        discard()
      } catch (error) {
        const message = (error as AxiosError<{ message: string }>).response?.data.message ?? "An error occurred";

        // Handle validation errors
        if ((error as Error).name === "ValidationError") {
          const errorList = String(error)?.split(":");
          toggleNotification({
            show: true,
            title: errorList[1],
            type: "error",
            message: errorMessage[errorList[1]?.trim() as keyof typeof errorMessage],
          });
          return;
        }

        // Notify API error
        toggleNotification({
          show: true,
          title: "Order Creation Error",
          type: "error",
          message: message,
        });
      }
    },
    onError: (error) => {
      const message = (error as AxiosError<{ message: string }>).response?.data.message ?? "An error occurred";
      toggleNotification({
        show: true,
        title: "Order Creation Error",
        type: "error",
        message: message,
      });
    },
    onSettled: () => setLoading(false),
  });

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title="Create New Order"
        discard={discard}
        addItem={mutate}
        btnText="Create Order"
        loading={loading}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Form */}
        <EditCustomerForm reset={key} order user={null} address={null} />

        {/* Cart Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <Typography size="s1" as="p" align="left" className="mb-4">
              Cart
            </Typography>
            <Button
              size="lg"
              color="light"
              className="border-0 h-9 bg-black-600 text-white"
              onClick={() => toggleDrawer(!cartDrawer)}
            >
              Add item to cart
            </Button>
          </div>

          {cartData && cartData.length < 1 ? (
            <EmptyCart close={() => toggleDrawer(true)} dashboard />
          ) : (
            cartData?.map((product: IProduct & { weight: number }) => (
              <div key={product.id} className="px-5 space-y-2">
                <CartOrderCard product={product} />
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
