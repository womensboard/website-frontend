import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';

type CheckboxProps = {
  name: string;
  checked: boolean;
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
};

type CheckboxWithLabelProps = CheckboxProps & {
  label: string;
};

export const Checkbox = ({ name, checked = true, onChange }: CheckboxProps) => {
  return (
    <div
      className={clsx(
        'cursor-pointer my-5 rounded-full relative shadow-sm w-[50px] inline-block',
        checked ? 'bg-red-500' : 'bg-gray-200'
      )}
    >
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        className="focus:outline-none peer checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto checked:right-0 checked:bg-white"
      />
      <label
        htmlFor={name}
        className="toggle-label peer-checked:bg-red-500 dark:bg-gray-700 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"
      />
    </div>
  );
};

export const CheckboxWithLabel = ({
  name,
  checked,
  label,
  onChange,
}: CheckboxWithLabelProps) => {
  return (
    <div className="flex items-center gap-[15px] font-semibold">
      <Checkbox name={name} checked={checked} onChange={onChange} /> {label}
    </div>
  );
};
