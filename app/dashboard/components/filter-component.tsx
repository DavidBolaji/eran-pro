"use client"
import { ICON } from '@/constants/icon';
import React, { useState } from 'react';

const FilterComponent = () => {
  const [selectedOption] = useState('1 Year');  

  return (
    <div className="relative inline-block">
      <button
       
        className="bg-black-600 text-black-100 px-3 py-1 font-bold rounded-full flex items-center focus:outline-none"
      >
        {selectedOption}
        <span className={`ml-2 transform rotate-0`}>
          <ICON.ChevronDownIcon size='14' />
        </span>
      </button>
      {/* {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10">
          <div
            onClick={() => handleSelect('Today')}
            className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
              selectedOption === 'Today' ? 'bg-green-100' : ''
            }`}
          >
            Today
          </div>
          <div
            onClick={() => handleSelect('1 Year')}
            className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
              selectedOption === '1 Year' ? 'bg-green-100' : ''
            }`}
          >
            1 Year
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FilterComponent;
