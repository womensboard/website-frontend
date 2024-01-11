import React from 'react';
import HeroSectionText from '../hero-section/hero-section-text';
import Image from 'next/image';

type HeroSectionProps = {
  header: string;
  imageURL: string;
};

const HeroSection = (props: HeroSectionProps) => {
  const { header, imageURL } = props;

  return (
    <div className="relative z-[-1] scroll-smooth">
      <div className="w-full xl:h-[440px] h-[300px]">
        <Image src={imageURL} alt="heroSection" fill className="object-cover" />
      </div>

      <HeroSectionText heading={header} />
    </div>
  );
};

export default HeroSection;
