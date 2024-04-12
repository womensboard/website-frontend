import React from 'react';

interface CollaborationListsProp {
  year: number | string;
  contents: string[];
}

const CollaborationLists = (props: CollaborationListsProp) => {
  const { year, contents } = props;
  return (
    <>
      <h2 className="text-primary_CTA_Color font-[700] text-[16px] xl:text-[24px] mb-[8px] xl:mb-[16px]">
        {year}
      </h2>
      <ul className="list-disc px-5">
        {contents.map((content, contentIndex) => (
          <li
            key={contentIndex}
            className=" text-secondary_text_color mb-5 font-[400] text-[14px] xl:text-[24px] leading:[17px] xl:leading-[30px] "
          >
            {content}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CollaborationLists;
