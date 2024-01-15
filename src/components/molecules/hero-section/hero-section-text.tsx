import React from 'react';

interface HeroSectionTextProp {
  heading: string;
  subText?: string;
}

const HeroSectionText = (props: HeroSectionTextProp) => {
  const { heading, subText } = props;
  return (
    <div className="absolute top-0 h-full w-full flex items-center justify-center text-justify flex-col bg-gradient-to-r from-[rgba(26,26,26,0.60)] to-[rgba(26,26,26,0.60)] font-mulish gap-[24px] px-[38px] ">
      <h1 className="xl:text-[60px] text-[24px] text-center font-[600] text-white">
        {heading}
      </h1>
      <p className=" xl:text-[24px] text-center text-[14px] font-[400] xl:leading-[30px] text-[#FDFDFD]">
        {subText}
      </p>
    </div>
  );
};

export default HeroSectionText;
