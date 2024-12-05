"use client";
import { Button } from "@/components/button/button";
import { CartCheckoutCard } from "@/components/card/cart-checkout-card";
import { initialIValLogedIn } from "@/components/form/another-address-form";
import { initialIVal } from "@/components/form/billing-form";
import { PromoForm } from "@/components/form/promo-form";
import { PaymentMethod } from "@/components/payment-method";
import PaymentComponent from "@/components/paystack/paystack";
import { Typography } from "@/components/typography/typography";
import { CheckCircleIcon } from "@/constants/icons/check-circle";
import { useAxios } from "@/hooks/use-axios";
import { useCartData } from "@/hooks/use-cart-data";
import { paystackKey } from "@/hooks/use-paystack";
import { useUser } from "@/hooks/use-user";
import { formatToNaira } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export const RenderSummaryCheckout = () => {
  const queryClient = useQueryClient();
  const { calculateTotal, cartData } = useCartData();
  const Axios = useAxios();
  const { user } = useUser();
  const total = (calculateTotal() ?? 0) + 2500;
  const router = useRouter();

  const prefetch = useCallback(() => {
    router.prefetch("/success");
  }, [router]);

  useEffect(() => {
    prefetch();
  }, [prefetch]);

  const navigateTo = useCallback(async () => {
    queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
      amount: 0 * 100,
      email: "",
      shown: false,
      publicKey: paystackKey,
      reference: Date.now().toString(),
    }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const paymentFlow = queryClient.getQueryData(["PAYMENT_FLOW"]);
    if (!user) {
      // ORDER_BILLING_NOT_LOGEDIN
      const data = queryClient.getQueryData([
        "ORDER_BILLING_NOT_LOGEDIN",
      ]) as typeof initialIVal;
      if (paymentFlow === "Debit card") {
        queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
          amount: total * 100,
          email: data.email,
          shown: true,
          publicKey: paystackKey,
          reference: Date.now().toString(),
        }));
      } else {
        queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
          amount: total * 0.25 * 100,
          email: data.email,
          shown: true,
          publicKey: paystackKey,
          reference: Date.now().toString(),
        }));
      }
    } else {
      const flow = queryClient.getQueryData(["BILLING"]);
      if (flow === "Select delivery address") {
        if (paymentFlow === "Debit card") {
          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: total * 100,
            email: user?.email,
            shown: true,
            publicKey: paystackKey,
            reference: Date.now().toString(),
          }));
        } else {
          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: total * 0.25 * 100,
            email: user?.email,
            shown: true,
            publicKey: paystackKey,
            reference: Date.now().toString(),
          }));
        }
      } else {
        if (paymentFlow === "Debit card") {
          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: total * 100,
            email: user?.email,
            shown: true,
            publicKey: paystackKey,
            reference: Date.now().toString(),
          }));
        } else {
          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: total * 0.25 * 100,
            email: user?.email,
            shown: true,
            publicKey: paystackKey,
            reference: Date.now().toString(),
          }));
        }
      }
    }
  }, [queryClient, total, user]);

  return (
    <div className="bg-black-100 lg:rounded-2xl ">
      <Typography
        align="left"
        size="h5"
        as="h5"
        className="text-white font-bold pt-8 px-6 pb-6"
      >
        Order Summary
      </Typography>
      {cartData?.map((product) => (
        <CartCheckoutCard key={product.id} product={product} />
      ))}
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-[16px] leading-5 flex"
          >
            Subtotal
          </Typography>
          <div className="">
            <Typography
              align="left"
              size="h6"
              as="h6"
              className="text-white font-bold"
            >
              {formatToNaira(calculateTotal() ?? 0, 2)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-[16px] leading-5 flex"
          >
            Delivery
          </Typography>
          <div className="">
            <Typography
              align="left"
              size="h6"
              as="h6"
              className="text-white font-bold"
            >
              {formatToNaira(2500, 2)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-8 bg-black-200 pb-6 mb-4">
        <Typography align="left" size="h6" as="h6" className="text-white flex">
          Total
        </Typography>
        <Typography align="left" size="h6" as="h6" className="text-white">
          {formatToNaira(total, 2)}
        </Typography>
      </div>
      <div className="px-6">
        <PromoForm />
        <div className="pt-6">
          <Typography
            align="left"
            size="s1"
            as="p"
            className="font-bold text-sm tracking-tight black-500 mb-2"
          >
            Select payment method
          </Typography>
          <PaymentMethod />
        </div>
      </div>
      <div className="px-6 pt-8">
        <Button
          size="lg"
          color="light"
          className="border-0 bg-black-600 black-100 w-full flex items-center justify-center"
          iconR={CheckCircleIcon}
          onClick={navigateTo}
        >
          Complete order
        </Button>
      </div>
      <PaymentComponent
        onSuccess={async () => {
          const paymentFlow = queryClient.getQueryData(["PAYMENT_FLOW"]);
          if (!user) {
            const data = queryClient.getQueryData([
              "ORDER_BILLING_NOT_LOGEDIN",
            ]) as typeof initialIVal;
            if (data.create) {
              await Axios.post("/orders-users/create", {
                ...data,
                orders: cartData,
                paymentType: paymentFlow,
                price: paymentFlow === "Debit card" ? total : total * 0.25,
              });
            }
            await Axios.post("/orders-users/no-create", {
              ...data,
              orders: cartData,
              paymentType: paymentFlow,
              price: paymentFlow === "Debit card" ? total : total * 0.25,
            });
          } else {
            const billFlow = queryClient.getQueryData(["BILLING"]) as string;
            console.log(billFlow);
            console.log(typeof billFlow);
            if (billFlow === "Select delivery address") {
              const addressId = queryClient.getQueryData([
                "ADDRESS_ID",
              ]) as string;
              const address = user.orderAddress.find(
                (el) => el.id === addressId
              );
              await Axios.post("/ordersusers/loggedin", {
                email: user.email,
                ...address,
                orders: cartData,
                paymentType: paymentFlow,
                price: paymentFlow === "Debit card" ? total : total * 0.25,
              });
            } else {
              const data = queryClient.getQueryData([
                "ORDER_BILLING_LOGEDIN",
              ]) as typeof initialIValLogedIn;
              await Axios.post("/ordersusers/loggedin", {
                ...data,
                orders: cartData,
                paymentType: paymentFlow,
                price: paymentFlow === "Debit card" ? total : total * 0.25,
              });
            }
          }

          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: 0 * 100,
            email: "",
            shown: false,
            publicKey: paystackKey,
            reference: Date.now().toString(),
          }));
          router.push("/success");
        }}
      />
    </div>
  );
};
