import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import SearchContent from '@/components/molecules/search-content';
import SearchForm from '@/components/organism/search-form';
import React from 'react';

const Search = () => {
  return (
    <div>
      <Navbar />
      <SearchForm />
      <SearchContent />
      <Footer />
    </div>
  );
};

export default Search;
