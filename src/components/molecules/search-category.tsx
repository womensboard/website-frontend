import React from 'react';
import Button from '@/components/atom/button';

const SearchCategory = () => {
  const searchOptions = [
    'Everywhere',
    'Projects',
    'Events',
    'News',
    'UN Collaboration',
  ];

  return (
    <div>
      <h2 className="font-[600] text-[28px] mb-[8px]">Search</h2>
      <select
        name="category"
        id="search"
        className="lg:w-[277px] w-[327px] bg-transparent h-[50px] rounded-[8px] "
      >
        {searchOptions.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
      <div className=" lg:block hidden mt-[56px] ">
        <Button size="md" type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SearchCategory;
