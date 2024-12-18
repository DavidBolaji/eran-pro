import React from "react";

import { UserOrderPayment } from "./component/user-order-payment";

interface PaymentPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function HomeOrdersPage({
  searchParams,
}: PaymentPageProps) {
  const email = searchParams?.em ?? "";
  const orderId = searchParams?.oId ?? "";
  const total = searchParams?.tL ? +searchParams?.tL: 0;

  return (
   <UserOrderPayment orderId={orderId} email={email} total={total} />
  );
}
