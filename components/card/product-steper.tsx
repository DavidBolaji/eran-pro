import { MinusIcon } from "@/constants/icons/minus";
import { PlusIcon } from "@/constants/icons/plus";
import { Product } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";

const Stepper: React.FC<{ weight: number; productId: string }> = ({
  weight,
  productId,
}) => {
  const [value, setValue] = useState(weight);
  const queryClient = useQueryClient();

  const increment = useCallback(() => {
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
        const newData = prev?.map((el) => {
          if (el?.id === productId) {
            return { ...el, weight: prevValue + 0.5 };
          } else {
            return el;
          }
        });
        console.log(newData);
        return newData;
      });
      return prevValue + 0.5;
    });
  }, [productId, queryClient]);

  
  const decrement = useCallback(() => {
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
        const newData = prev.map((el) => {
          if (el.id === productId) {
            return { ...el, weight: Math.max(0, prevValue - 0.5) };
          } else {
            return el;
          }
        });
        return newData;
      });

      return Math.max(0, prevValue - 0.5);
    });
  }, [productId, queryClient]);

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
