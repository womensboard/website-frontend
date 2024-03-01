import React from 'react';
import SearchCategory from '../molecules/search-category';
import { SearchInput } from './search-input';

const SearchForm = () => {
  return (
    <form className="font-mulish lg:flex block gap-[40px] border-y-[1px] border-y-primary_CTA_Color bg-secondary_color p-[24px] xl:p-[48px_120px] ">
      <SearchCategory />

      <SearchInput />
    </form>
  );
};

export default SearchForm;
