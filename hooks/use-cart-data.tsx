"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, Promotion } from "@prisma/client";
import { IProduct } from "@/actions/get-products";
import { endOfToday, isAfter, isBefore, startOfToday, parseISO } from "date-fns";
import { useNotification } from "./use-notification";

export const useCartData = () => {
  const queryClient = useQueryClient();
  const {toggleNotification} = useNotification()

  const addProduct = (product: IProduct & { weight: number }) => {
    const stepValue = product.unit === "PER_KG" ? 0.5 : 1;
    queryClient.setQueryData(["CART_QTY"], stepValue);
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const exists = prev.length;
      const exists2 = prev?.filter((el) => el.id === product.id);
      const all = exists && exists2.length;

      if (all) {
        return prev?.map((el) => {
          if (el.id === product.id) {
            return {
              ...product,
              weight: product.weight ? product.weight : stepValue,
            };
          } else {
            return el;
          }
        });
      }

      if (!exists) {
        const productData = {
          ...product,
          weight: product.weight ? product.weight : stepValue,
        };
        return [productData];
      }
      return [
        ...prev,
        { ...product, weight: product.weight ? product.weight : stepValue },
      ];
    });
  };


  const applyPromotion = (promotion: Promotion) => {
    console.log(promotion)
    queryClient.setQueryData(["CART_DATA"], (prev: (Product & { promotion: Promotion[] })[]) => {
      // Check if the promotion is valid (active and within the date range)
      const now = new Date();
      console.log('START')
      const isPromotionValid =
        promotion.status === true &&
        isAfter(now, parseISO(promotion.startDate as unknown as string)) &&
        isBefore(now, parseISO(promotion.endDate as unknown as string));
        console.log(isPromotionValid)
  
      if (!isPromotionValid) {
        console.log("Promotion is not valid or expired.");
        toggleNotification({
          type: "error",
          show: true,
          title: "Coupoun Error",
          message: "Coupoun is not valid or expired"
        })
        return prev; // Return the cart data as-is if the promotion is invalid
      }
  
      // Check if there is any product without a promotion or with the same promotion already applied
      let productApplied = false;
      console.log('STARTED');
      
      const updatedProducts = prev.map((product) => {
        // If the product doesn't already have the promotion (by checking promotion code)
        if (!product.promotion || product.promotion.length === 0) {
          productApplied = true;
  
          // Apply the promotion to this product
          return {
            ...product,
            promotion: [...product.promotion, promotion], // Add the promotion to the product's promotions
          };
        }
  
        // Check if the promotion already exists in the product's promotions
        if (product.promotion.some((existingPromo) => existingPromo.id === promotion.id)) {
          console.log(`Promotion '${promotion.name}' is already applied to this product.`);
          toggleNotification({
            type: "error",
            show: true,
            title: "Coupoun Error",
            message: `Promotion '${promotion.code}' is already applied to this product`
          })
          return product; // Skip applying the promotion if it already exists
        }
  
        // Apply the promotion if it's not already applied
        return {
          ...product,
          promotion: [...product.promotion, promotion], // Add the promotion to the product's promotions
        };
      });
  
      if (!productApplied) {
        toggleNotification({
          type: "error",
          show: true,
          title: "Coupoun Error",
          message: `Promotion has already been applied to this order`
        })
        console.log("All products already have promotions.");
        return prev; // Return the cart data as-is if all products already have promotions
      }
  
      toggleNotification({
        type: "success",
        show: true,
        title: "Coupoun Applied",
        message: `Coupoun applied successfully to order`
      })
      // Return the updated list of products with the promotion applied
      return updatedProducts;
    });
  };

  const deleteProduct = (productId: string) => {
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const newCart = prev.filter((product) => product.id !== productId);
      return newCart;
    });
  };

  const calculateTotal = () => {

    return cartData?.reduce((acc, prod) => {
      
      const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      if (
        prod?.promotion?.length &&
        isBefore(new Date(prod?.promotion[0].startDate), endOfToday()) &&
        isAfter(new Date(prod?.promotion[0].endDate), startOfToday())
      ) {
        return (acc += ((1 - prod.promotion[0]?.discount / 100) * prod.price * prod.weight) / stepValue);
      }
      return (acc += (prod.price * prod.weight) / stepValue);
    }, 0);
  };

  const { data: cartData } = useQuery({
    queryKey: ["CART_DATA"],
    queryFn: () =>
      (queryClient.getQueryData(["CART_DATA"]) as (IProduct & {
        weight: number;
      })[]) || [],
    staleTime: Infinity,
  });

  return { addProduct, cartData, deleteProduct, calculateTotal, applyPromotion };
};
