import React from 'react';

interface CollaboraionsProps {
  heading: string;
  subtext: string;
}

const Heading = (props: CollaboraionsProps) => {
  const { heading, subtext } = props;

  return (
    <div>
      <h1 className="font-[600] xl:text-[60px] text-[28px] text-primary_text_color">
        {heading}
      </h1>
      <p className="font-[400] xl:text-[24px] text-[14px] leading-[17px] xl:leading-[30px] lg:mt-[24px] mt-[16px] text-secondary_text_color">
        {subtext}
      </p>
    </div>
  );
};

export default Heading;
