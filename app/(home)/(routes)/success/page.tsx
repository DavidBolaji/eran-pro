import { Button } from "@/components/button/button";
import { Typography } from "@/components/typography/typography";
import Link from "next/link";
import React from "react";

export default async function SuccessPage() {
  return (
    <div className="pt-20">
      <Typography
        as="h4"
        size="h4"
        align="center"
        className="black-100 font-bold mb-4"
      >
        Thank You for Your Order! 🎉
      </Typography>
      <Typography
        as="p"
        size="s1"
        align="center"
        className="black-100 font-light mb-8 max-w-lg mx-auto"
      >
        Your order has been received and is being prepared with care. We&apos;ll
        notify you once it&apos;s on its way.
      </Typography>
      <div className="w-full flex justify-center mb-20">
        <Button color="dark" size="lg" className="">
          <Link href={'/'}>Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
