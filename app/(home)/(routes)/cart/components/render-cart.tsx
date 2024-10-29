"use client"
import { CartOrderCard } from '@/components/card/cart-order-card';
import { useCartData } from '@/hooks/use-cart-data'
import React from 'react'

export const RenderCart = () => {
  const {cartData} =  useCartData();
  return cartData?.map(cart => (
    <CartOrderCard key={cart.id} product={cart} />
  ))
}
