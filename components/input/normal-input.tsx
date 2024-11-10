// normal-input.tsx

import React, { useState, FocusEvent, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

// Define InputProps, adding optional rightIcon, leftIcon, and align props.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  align?: number;
  naira?: boolean
  y?: number
}

const NormalInput: React.FC<InputProps> = ({
  rightIcon,
  leftIcon,
  align = -15,
  y = -10,
  naira = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, placeholder, onBlur, ...props } = rest;
  props.required = props.required ?? false; // Use nullish coalescing to ensure `required` is true if not provided.

  // Optimize input style classes with classNames utility.
  const inputStyle = classNames(
    "w-full pl-4 font-satoshi placeholder:font-medium placeholder:black-300 placeholder:leading-4 bg-transparent  h-12 flex items-center focus:outline-none",
    {
      "pl-8 -translate-0.5": leftIcon,
      "pl-3 translate-y-1.5": !leftIcon,
    },
    {
      "pr-10": rightIcon,
      "pr-3": !rightIcon,
    },
    {
      "ml-8 ": naira,
    },
    {
      "placeholder:text-transparent": isFocused || hasValue,
    },
    className
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(Boolean(e.target.value)); // Update `hasValue` only if the input has content.
  };

  return (
    <div className={`relative w-full border border-[#C8E0D2] rounded-2xl ${hasValue ? "bg-grey-100": "bg-grey-200"}`}>
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      {/* Input Field */}
      {naira && (
        <div className="absolute z-20 bg-black border h-[51.01px] rounded-s-2xl border-black flex items-center justify-center font-satoshi text-white top-1/2 w-10 transform -translate-y-1/2">
          ₦
        </div>
      )}
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputStyle}
        {...props}
      />

      {/* Floating Label - Position based on focus and value */}
      <motion.label
        initial={{ y: 0, scale: 1, x: 0 }}
        animate={{
          y: isFocused || hasValue ? y : 0,
          x: isFocused || hasValue ? align : leftIcon ? 10 : 0,
          scale: isFocused || hasValue ? 0.7 : 1,
        }}
        transition={{ type: "linear", stiffness: 200 }}
        className={`absolute ${
          leftIcon ? "left-6" : "left-3"
        } top-3 black-300 text-sm pointer-events-none  ${
          isFocused || hasValue ? "text-base" : "text-sm"
        } ${
          naira ? "pl-10" : "text-sm"
        }`}
      >
        {placeholder} {props.required && "*"}
      </motion.label>

      {/* Right Icon */}
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default NormalInput;
