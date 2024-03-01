import Image from 'next/image';
import React from 'react';

type HeroSectionProps = {
  header: string;
  subHeader: string;
  imageURL: string[];
};

const HeroSection = (props: HeroSectionProps) => {
  const { header, subHeader, imageURL } = props;

  return (
    <>
      <div className="relative z-[-1] ">
        <div className="w-full xl:h-[600px] h-[494px]">
          <Image
            src={imageURL[0]}
            alt="heroSection"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-0 h-full w-full flex flex-col justify-center bg-gradient-to-r from-[rgba(26,26,26,0.60)] to-[rgba(26,26,26,0.60)] font-mulish gap-[24px] px-[24px]  xl:p-[63px_140px]">
          <h1 className="xl:text-[60px] text-[28px] font-[600] xl:leading-[65px] max-w-[700px] text-white">
            {header}
          </h1>
          <p className="max-w-[880px] xl:text-[24px] text-[14px] font-[400] xl:leading-[30px] text-[#FDFDFD]">
            {subHeader}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
