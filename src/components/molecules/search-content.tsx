import { searchContents } from 'config/search';
import Image from 'next/image';
import React from 'react';
import Button from '../atom/button';

const SearchContent = () => {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-2 gap-[48px] p-[24px] xl:p-[48px_120px]">
      {searchContents.map((content, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-[20px] h-[250px] xl:h-[436px] border-2 border-secondary_color text-center lg:p-[24px_20px] p-[8px]  "
          >
            <Image
              src={content.imageURL}
              alt=""
              className="md:w-[96px] w-[48px] h-[48px] md:h-[96px] md:mb-[32px] mb-[16px] bg-tertiary_color rounded-full"
            />
            <h3 className="font-[700] md:text-[24px] text-[18px] leading-[30px]">
              {content.heading}
            </h3>
            <p className="md:text-[20px] text-primary_text_color leading-[17px] line-clamp-3 md:leading-[24px] text-[14px] font-[400] md:mb-[57px] mb-[24px] mt-[8px] text-center">
              {content.description}
            </p>
            <Button type="primary" size="md">
              View
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
