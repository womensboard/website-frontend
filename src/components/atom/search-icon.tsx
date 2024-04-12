import React from 'react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchIcon = () => {
  return (
    <Link href="#">
      <AiOutlineSearch size={24} color="secondary_text_color" />
    </Link>
  );
};

export default SearchIcon;
