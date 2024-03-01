import Image from 'next/image';
import React from 'react';
import HeroSectionText from './hero-section-text';

interface HeroSectionProps {
  heading: string;
  imageURL: string;
}

const ProjectHeroSection = (props: HeroSectionProps) => {
  const { heading, imageURL } = props;
  return (
    <div className="relative z-[-1]">
      <div className={`relative w-full xl:h-[440px] h-[400px]`}>
        <Image
          src={imageURL}
          alt="Project heroSection"
          fill
          className="object-cover object-top"
        />
      </div>
      <HeroSectionText heading={heading} />
    </div>
  );
};

export default ProjectHeroSection;
