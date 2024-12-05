"use client";
import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { useCartData } from "@/hooks/use-cart-data";

import { CartDrawerDashboardFooter } from "./cart-drawer-footer-dashboard";
import { Grid } from "antd";
import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";
import { useCartDashboardDrawer } from "@/hooks/use-cart-dashboard-drawer";
import { ProductDashboardForm } from "@/components/form/produt-dashboard-form";

const { useBreakpoint } = Grid;

export const CartDashboardDrawer = () => {
  const { cartDrawer, toggleDrawer } = useCartDashboardDrawer();
  const { cartData } = useCartData();

  const screen = useBreakpoint();

  return (
    <div>
      {screen.lg && (
        <StyledDrawer
          open={(cartDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(false)}
          closeIcon={null}
          width={485}
          footer={
            cartData && cartData?.length < 1 ? null : <CartDrawerDashboardFooter />
          }
        >
          <div className="w-full h-24 sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
              <ShoppingCartIcon size="32" />
              <span className="inline-block pl-2.5 text-h5 font-bold text-2xl black-100">
                Add Item to Cart ({cartData?.length ?? 0})
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
         <ProductDashboardForm />
          {/* {cartData && cartData?.length < 1 ? (
            <EmptyCart close={() => toggleDrawer(!cartDrawer)} />
          ) : (
            cartData?.map((product: IProduct & { weight: number }) => (
              <div key={product.id} className="px-5 space-y-4">
                <CartOrderCard product={product} />
              </div>
            ))
          )} */}
        </StyledDrawer>
      )}

      {!screen.lg && (
        <StyledMobileDrawer
          open={(cartDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(false)}
          placement="bottom"
          height={"90%"}
          closeIcon={null}
          width={485}
          footer={
            cartData && cartData?.length < 1 ? null : <CartDrawerDashboardFooter />
          }
        >
          <div className="w-full h-[76px] sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
              <ShoppingCartIcon size="28" />
              <span className="inline-block pl-2.5 text-h5 font-bold text-xl black-100">
                Add Item to Cart ({cartData?.length ?? 0})
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          <ProductDashboardForm />
          {/* {cartData && cartData?.length < 1 ? (
              <EmptyCart close={() => toggleDrawer(!cartDrawer)} />
            ) : (
              cartData?.map((product: IProduct & { weight: number }) => (
                <div key={product.id} className="px-5 space-y-2">
                  <CartOrderCard product={product} />
                </div>
              ))
            )} */}
        </StyledMobileDrawer>
      )}
    </div>
  );
};
