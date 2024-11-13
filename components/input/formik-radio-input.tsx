import React from "react";
import { useField } from "formik";

interface RadioOption {
  id: string;        // Unique ID for each option
  name: string;      // Name for each radio button group
  value: string;     // Display value for each option
  label?: string;
}

interface CustomRadioInputProps {
  name: string;
  options: RadioOption[];
  onChange?: (value: string) => void;  // Optional custom onChange handler
}

const FormikRadioInput: React.FC<CustomRadioInputProps> = ({ name, options, onChange }) => {
  const [field,, helpers] = useField(name); 
  const { setValue } = helpers;

  const handleChange = (value: string) => {
    setValue(value);  // Update Formik state
    if (onChange) {
      onChange(value);  // Call custom onChange if provided
    }
  };

  return (
    <div className="flex">
      {options.map((option) => (
        <div key={option.id} className="mr-3 mt-1">
          <input
            type="radio"
            id={option.id} // Unique ID for each radio button
            name={option.name} // Unique name if needed per FieldArray item
            value={option.value}
            checked={field.value === option.value}
            onChange={() => handleChange(option.value)}
            className="hidden"
          />
          <label
            htmlFor={option.id} // Associate label with unique ID
            className="cursor-pointer flex flex-row-reverse gap-2"
          >
            <span className="font-medium text-base leading-5 black-100">
              {option?.label || option.value}
            </span>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                field.value === option.value
                  ? "border-black bg-black"
                  : "border-[#C8E0D2] bg-black-500"
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormikRadioInput;
