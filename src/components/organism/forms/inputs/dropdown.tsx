import React from 'react';

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  defaultValue: string;
  options: DropdownOption[];
};
const Dropdown = (props: DropdownProps) => {
  const { defaultValue, options } = props;

  const currentOption = options.find((option) => option.value === defaultValue);
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-gray-900 bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-600  dark:hover:bg-gray-50 dark:focus:ring-blue-800 dark:placeholder-gray-400 dark:text-white"
        type="button"
      >
        {currentOption?.label}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {options.map((option) => (
            <li key={option.value}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
