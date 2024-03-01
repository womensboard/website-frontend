import React from 'react';
import Image from 'next/image';
import { Project } from './project-info';

const Detail = (props: Project) => {
  const { imageURL, title, description } = props;

  return (
    <div className="font-mulish max-w-[1180px] mx-auto text-left bg-white p-[24px]">
      <h1 className="text-primary_text_color font-[600] text-[24px] lg:text-[40px] mb-[24px]">
        {title}
      </h1>

      <div className="relative xl:w-[1120px] h-[600px] rounded-[30px]  object-cover">
        <Image
          src={imageURL}
          alt="detail-image"
          fill
          className="object-cover  rounded-[30px]"
        />
      </div>

      <p className="mt-[32px] mb-[20px] text-secondary_text_color font-[400] text-[16px] lg:text-[20px] leading-[20px] lg:leading-[39px] text-justify">
        {description}
      </p>
    </div>
  );
};

export default Detail;
