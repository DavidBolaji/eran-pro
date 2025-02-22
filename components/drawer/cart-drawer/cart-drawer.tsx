"use client";
import { useCartDrawer } from "@/hooks/use-cart-drawer";
import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { useCartData } from "@/hooks/use-cart-data";
import { EmptyCart } from "@/components/empty/empty-cart";
import { CartOrderCard } from "@/components/card/cart-order-card";
import { IProduct } from "@/actions/get-products";
import { CartDrawerFooter } from "./cart-drawer-footer";
import { Grid } from "antd";
import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";
const { useBreakpoint } = Grid;

export const CartDrawer = () => {
  const { cartDrawer, toggleDrawer } = useCartDrawer();
  const { cartData } = useCartData();
  const screen = useBreakpoint();

  return (
    <div>
      {screen.lg && (
        <StyledDrawer
          open={(cartDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(!cartDrawer)}
          closeIcon={null}
          width={485}
          footer={
            cartData && cartData?.length < 1 ? null : <CartDrawerFooter />
          }
        >
          <div className="w-full h-24 sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
              <ShoppingCartIcon size="32" />
              <span className="inline-block pl-2.5 text-h5 font-bold text-2xl black-100">
                Your Cart ({cartData?.length ?? 0})
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(!cartDrawer)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          {cartData && cartData?.length < 1 ? (
            <EmptyCart close={() => toggleDrawer(!cartDrawer)} />
          ) : (
            cartData?.map((product: IProduct & { weight: number }) => (
              <div key={product.id} className="px-5 space-y-4">
                <CartOrderCard product={product} />
              </div>
            ))
          )}
        </StyledDrawer>
      )}

        {!screen.lg && (
          <StyledMobileDrawer
            open={(cartDrawer as boolean) ?? false}
            onClose={() => toggleDrawer(!cartDrawer)}
            placement="bottom"
            height={"90%"}
            closeIcon={null}
            width={485}
            footer={
              cartData && cartData?.length < 1 ? null : <CartDrawerFooter />
            }
          >
            <div className="w-full h-[76px] sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
              <div className="flex items-center">
                <ShoppingCartIcon size="28" />
                <span className="inline-block pl-2.5 text-h5 font-bold text-xl black-100">
                  Your Cart ({cartData?.length ?? 0})
                </span>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => toggleDrawer(!cartDrawer)}
              >
                <CloseIcon size="24" color="#92B09F" />
              </div>
            </div>
            {cartData && cartData?.length < 1 ? (
              <EmptyCart close={() => toggleDrawer(!cartDrawer)} />
            ) : (
              cartData?.map((product: IProduct & { weight: number }) => (
                <div key={product.id} className="px-5 space-y-2">
                  <CartOrderCard product={product} />
                </div>
              ))
            )}
          </StyledMobileDrawer>
        )}

    </div>
  );
};
