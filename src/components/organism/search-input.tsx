import React from 'react';
import Button from '@/components/atom/button';

export const SearchInput = () => {
  return (
    <div className="mt-[16px] lg:mt-0  ">
      <label
        htmlFor="searchContent"
        className="font-[600] text-[28px] mb-[8px] "
      >
        For
      </label>
      <input
        required
        type="search"
        name="search"
        id="search"
        placeholder="Search..."
        className="block h-[50px] bg-transparent mt-[8px] px-[20px] xl:w-[883px] lg:w-[550px] w-[327px] rounded-[8px] border-[1px] "
      />
      <div className="lg:hidden mt-[16px] xl:mt-0  ">
        <Button size="md" type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};
