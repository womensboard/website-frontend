import React from 'react';
import clsx from 'clsx';

interface YearButtonProps {
  year: number | string;
  handleYearClick: () => void;
  isCurrentSelectedYear: boolean;
}

const YearButton = (props: YearButtonProps) => {
  const { isCurrentSelectedYear, year, handleYearClick } = props;

  return (
    <button
      onClick={handleYearClick}
      className={clsx(
        isCurrentSelectedYear
          ? 'bg-primary_CTA_Color text-white border-none'
          : 'border-[1px] cursor-pointer',
        'rounded-[8px] border-primary_text_color h-fit lg:text-[20px] text-[14px] font-[500] lg:w-[80px] w-[50px] lg:py-[12px] text-center p-[8px]'
      )}
    >
      {year}
    </button>
  );
};

export default YearButton;
