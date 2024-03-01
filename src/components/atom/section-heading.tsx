import React from 'react';

type SectionHeadingProps = {
  heading: string;
};

const SectionHeading = ({ heading }: SectionHeadingProps) => {
  return (
    <h2 className="text-center text-primary_text_color font-[600] mb-[16px] lg:text-[36px] text-[20px] font-mulish">
      {heading}
    </h2>
  );
};

export default SectionHeading;
