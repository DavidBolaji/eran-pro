import React, { useState, FocusEvent, SelectHTMLAttributes } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  align?: number;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectProps> = ({
  rightIcon,
  leftIcon,
  align = -15,
  options,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { className, onBlur, onChange, ...props } = rest;
  props.required = props.required ?? true;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    setHasValue(Boolean(e.target.value)); // Update `hasValue` only if a value is selected.
    if (onBlur) onBlur(e); // Call external onBlur if provided
  };

  const handleChange = (e: FocusEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
  };

  const selectStyle = classNames(
    "w-full pl-4 bg-transparent placeholder:text-transparent translate-y-4 flex items-center focus:outline-none",
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

  return (
    <div className="relative h-12 w-full border pr-2 border-[#C8E0D2] bg-grey-200 rounded-2xl">
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      {/* Select Field */}
      <select
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={selectStyle}
        {...props}
        defaultValue=""
      >
        <option value="" >
           {/* {placeholder} */}
        </option>
        {options.map((option) => (
          <option className="bg-white" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Floating Label */}
      <motion.label
        initial={{ y: 20, scale: 1 }}
        animate={{
          y: isFocused || hasValue ? 6 : 20,
          x: isFocused || hasValue ? align : 0,
          scale: isFocused || hasValue ? 0.7 : 1,
        }}
        transition={{ type: "linear", stiffness: 200 }}
        className={`absolute ${leftIcon ? "left-6" : "left-3"} -top-2 text-sm pointer-events-none`}
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

export default SelectInput;






