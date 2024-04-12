import clsx from 'clsx';
import React from 'react';

const colors = {
  purple: "text-['#371F70']",
  white: 'text-white',
};
interface HeadingProps {
  children: string;
  color?: keyof typeof colors;
}

const SectionHeading = ({ children, color = 'purple' }: HeadingProps) => {
  const classNames = clsx(
    'text-center font-[700] font-roboto text-[25px] pb-[24px]',
    colors[color]
  );
  return <div className={classNames}>{children}</div>;
};

export default SectionHeading;
