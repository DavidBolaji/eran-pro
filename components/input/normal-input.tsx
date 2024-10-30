// normal-input.tsx

import React, { useState, FocusEvent, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

// Define InputProps, adding optional rightIcon, leftIcon, and align props.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  align?: number;
}

const NormalInput: React.FC<InputProps> = ({
  rightIcon,
  leftIcon,
  align = -15,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  let { className, placeholder, required, onBlur, ...props } = rest;
  required = required ?? true; // Use nullish coalescing to ensure `required` is true if not provided.

  // Optimize input style classes with classNames utility.
  const inputStyle = classNames(
    "w-full pl-4 bg-transparent translate-y-1.5 h-12 flex items-center focus:outline-none",
    {
      "pl-10": leftIcon,
      "pl-3": !leftIcon,
    },
    {
      "pr-10": rightIcon,
      "pr-3": !rightIcon,
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
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputStyle}
        {...props}
      />

      {/* Floating Label - Position based on focus and value */}
      <motion.label
        initial={{ y: 20, scale: 1 }}
        animate={{
          y: isFocused || hasValue ? -10 : 0,
          x: isFocused || hasValue ? align : 0,
          scale: isFocused || hasValue ? 0.7 : 1,
        }}
        transition={{ type: "linear", stiffness: 200 }}
        className={`absolute ${
          leftIcon ? "left-6" : "left-3"
        } top-3 text-sm pointer-events-none`}
      >
        {placeholder} {required && "*"}
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
