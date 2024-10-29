import React, { useState, FocusEvent, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const NormalInput: React.FC<InputProps> = ({
  rightIcon,
  leftIcon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { className, ...prop } = rest;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  const inputStyle = classNames(
    "w-full pl-4 rounded-2xl bg-transparent placeholder:text-transparent translate-y-1.5 h-12 flex items-center focus:outline-none",
    {
      "pl-10": leftIcon,
      "pl-3": !leftIcon,
    },
    {
      "pl-10": rightIcon,
      "pl-3": !rightIcon,
    },
    {
      "placeholder:text-transparent": isFocused || hasValue,
    },
    className
  );

  return (
    <div className="relative w-full border border-[#C8E0D2] bg-grey-200 rounded-2xl">
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
        {...prop}
      />

      {/* Floating Label */}
      <motion.label
        initial={{ y: 20, scale: 1 }}
        animate={{
          y: isFocused || hasValue ? -10 : 0,
          x: isFocused || hasValue ? -17 : 0,
          scale: isFocused || hasValue ? 0.7 : 1,
        }}
        transition={{ type: "linear", stiffness: 200 }}
        className={`absolute left-${
          leftIcon ? 20 : 3
        } top-3 black-300 text-sm pointer-events-none`}
      >
        {prop.placeholder} {prop.required && "*"}
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
