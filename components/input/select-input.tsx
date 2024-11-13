"use client";
import React, {
  useState,
  FocusEvent,
  SelectHTMLAttributes,
  useRef,
  useEffect,
} from "react";
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
  const [hasValue, setHasValue] = useState(!!rest.value);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const { className, onBlur, onChange, ...props } = rest;
  props.required = props.required ?? true;

  useEffect(() => {
    const el = selectRef.current;
    el?.addEventListener("change", () => {
      el.blur();
    });

    return () => {
      el?.removeEventListener("change", () => {});
    };
  }, []);

  const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    setHasValue(Boolean(e.target.value));
    if (onBlur) onBlur(e);
  };

  const handleOptionClick = () => {
    selectRef.current?.blur(); // Trigger blur when an option is clicked
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log("Option clicked:", selectedValue); // Log the selected option's value
    setHasValue(Boolean(selectedValue)); // Update state based on selected value

    if (onChange) {
      onChange(e); // Call external onChange if provided
    }
  };

  const selectStyle = classNames(
    "w-full font-satoshi pl-4 bg-transparent placeholder:text-transparent translate-y-4 flex items-center focus:outline-none",
    {
      "pl-10": leftIcon,
      "pl-3": !leftIcon,
    },
    {
      "pr-10": rightIcon,
      "pr-3": !rightIcon,
    },
    {
      "text-transparent": isFocused, // Hide selected text on focus
      "text-black": !isFocused && hasValue, // Show selected text when not focused
    },
    {
      "placeholder:text-transparent": isFocused || hasValue,
    },
    className
  );

  return (
    <div className="relative overflow-hidden h-12 group w-full border pr-2 border-[#C8E0D2] bg-grey-200 rounded-2xl">
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      {/* Select Field */}
      <select
        ref={selectRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}  // Handle option selection
        className={selectStyle}
        {...props}
      >
        <option value="">{/* Empty option for placeholder */}</option>
        {options?.map((option) => (
          <option
            className="text-black"
            key={option.value}
            onClick={handleOptionClick}
            value={option.value}
          >
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
        className={`absolute black-300 font-medium ${
          leftIcon ? "left-6" : "left-3"
        } -top-2 text-nowrap text-sm pointer-events-none  ${
          isFocused || hasValue ? "text-base" : "text-sm"
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

export default SelectInput;
