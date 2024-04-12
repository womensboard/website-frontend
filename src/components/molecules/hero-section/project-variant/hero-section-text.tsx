import React from 'react';

import Button from '@/components/atom/button';

interface HeroSectionTextProp {
  heading: string;
  subText?: string;
  donateURL?: string;
}

const HeroSectionText = (props: HeroSectionTextProp) => {
  const { heading, subText, donateURL } = props;

  const heroButtonURL = donateURL || '#';

  return (
    <div className="absolute top-0 h-full w-full flex items-center justify-center text-center flex-col bg-gradient-to-r from-[rgba(26,26,26,0.60)] to-[rgba(26,26,26,0.60)] font-mulish gap-[24px] px-[38px]">
      <h1 className="xl:text-[60px] text-[28px] font-[600] xl:leading-[65px] text-white">
        {heading}
      </h1>
      <p className="max-w-[880px] xl:text-[24px] text-[14px] font-[400] xl:leading-[30px] text-[#FDFDFD]">
        {subText}
      </p>
      {donateURL && (
        <Button href={heroButtonURL} type="secondary" size="lg">
          Donate Now
        </Button>
      )}
    </div>
  );
};

export default HeroSectionText;
