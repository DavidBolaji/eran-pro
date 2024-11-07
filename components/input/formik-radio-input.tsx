import React from "react";
import { useField } from "formik";

interface RadioOption {
  name: string;
  value: string;
}

interface CustomRadioInputProps {
  name: string;
  options: RadioOption[];
}

const FormikRadioInput: React.FC<CustomRadioInputProps> = ({ name, options }) => {
  const [field, , helpers] = useField(name); 
  const { setValue } = helpers;

  return (
    <div className="flex">
      {options.map((option) => (
        <div key={option.value} className="mr-3 mt-1">
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={field.value === option.value}
            onChange={() => setValue(option.value)}
            defaultChecked={field.value === option.value}
            className="hidden"
          />
          <label
            htmlFor={option.value}
            className="cursor-pointer flex flex-row-reverse gap-2"
          >
            <span className="font-medium text-base leading-5 black-100">
                {option.value}
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
