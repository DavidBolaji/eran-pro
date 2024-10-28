
import { IProduct } from "@/actions/get-products";
import { MinusIcon } from "@/constants/icons/minus";
import { PlusIcon } from "@/constants/icons/plus";
import { Product } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

const Stepper: React.FC<{ weight: number; product: IProduct }> = ({
  weight,
  product,
}) => {
  const [value, setValue] = useState(weight);
  const queryClient = useQueryClient();

  useEffect(()=> {
    setValue(weight)
  }, [weight])
  

  const increment = useCallback(() => {
    console.log('first')
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
        const newData = prev?.map((el) => {
          if (el?.id === product.id) {
            return { ...el, weight: prevValue + 0.5 };
          } else {
            return el;
          }
        });
        return newData;
      });
      return prevValue + 0.5;
    });
  }, [product, queryClient]);

  
  const decrement = useCallback(() => {
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
        const newData = prev.map((el) => {
          if (el.id === product.id) {
            return { ...el, weight: Math.max(0, prevValue - 0.5) };
          } else {
            return el;
          }
        });
        return newData;
      });

      return Math.max(0, prevValue - 0.5);
    });
  }, [product, queryClient]);

  return (
    <div className="flex items-center justify-center w-[140px] h-[40px] border border-gray-800 rounded-full font-bold text-gray-800 px-1">
      <button
        onClick={decrement}
        disabled={value <= 0.5}
        className="w-10 h-10 flex items-center justify-center text-xl disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <MinusIcon />
      </button>
      <div className="w-[60px] text-center text-sm">{value}kg</div>
      <button
        onClick={increment}
        className="w-10 h-10 flex items-center justify-center text-xl"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Stepper;