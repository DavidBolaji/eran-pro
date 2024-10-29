import { IProduct } from "@/actions/get-products";
import { MinusIcon } from "@/constants/icons/minus";
import { PlusIcon } from "@/constants/icons/plus";

import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";

const StepperTwo: React.FC<{ weight: number; product?: IProduct }> = ({
  weight,
}) => {
  const [value, setValue] = useState(weight);
  const queryClient = useQueryClient();

  const increment = useCallback(() => {
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_QTY"], prevValue + 0.5);
      return prevValue + 0.5;
    });
  }, [queryClient]);

  const decrement = useCallback(() => {
    setValue((prevValue) => {
      queryClient.setQueryData(["CART_QTY"], Math.max(0, prevValue - 0.5));
      return Math.max(0, prevValue - 0.5);
    });
  }, [queryClient]);

  return (
    <div className="flex items-center justify-center w-[140px] h-12 border border-gray-800 rounded-full font-bold text-gray-800 px-1">
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

export default StepperTwo;
