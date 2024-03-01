import React from 'react';
import Link from 'next/link';

type CTALinksProps = {
  label1: string;
  href1: string;
  label2: string;
  href2: string;
};
const CTALinks = (props: CTALinksProps) => {
  const { label1, href1, label2, href2 } = props;
  return (
    <div className="flex items-center h-full">
      <div className="flex md:flex-row flex-col gap-[10px] md:mt-0 mt-[100px]">
        <Link
          href={href1}
          className="p-[12px_33px]  text-secondary_bg_color font-[500] text-[20px] font-roboto whitespace-nowrap"
        >
          {label1}
        </Link>
        <Link
          href={href2}
          className="p-[12px_33px] bg-cta_color transition-all hover:bg-secondary_color rounded-[8px] text-white font-[500] text-[20px] font-roboto whitespace-nowrap"
        >
          {label2}
        </Link>
      </div>
    </div>
  );
};

export default CTALinks;
