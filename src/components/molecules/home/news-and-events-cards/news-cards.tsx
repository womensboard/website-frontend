import Button from '@/components/atom/button';
import { NewsInput } from '@/components/organism';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

export type NewsCardTypes = NewsInput & {
  cardPath: string;
  date: string;
  shareURL: string;
};

const NewsCards = (props: NewsCardTypes) => {
  const { imageURL, title, description, author, cardPath, date } = props;

  const sentences = description.split('.');
  let firstSentence = sentences.slice(0, 1).join('. ');

  if (!/[.!?,]$/.test(firstSentence)) {
    firstSentence += '.';
  }

  return (
    <div className="lg:max-w-[420px] max-w-[343px] relative h-[560px]">
      <div className="relative lg:w-[420px] w-[343px] lg:h-[320px] h-[240px]">
        <Image
          src={imageURL[0]}
          alt="news-image"
          className="object-cover rounded-[8px_8px_0_0]"
          fill
        />
      </div>

      <div
        className={clsx(
          'p-[16px] font-mulish text-left rounded-[0px_0px_20px_20px] bg-secondary_color'
        )}
      >
        <h1 className="text-primary_text_color font-[600] text-[24px]">
          {title}
        </h1>
        <p className="mt-[8px] mb-[12px] text-secondary_text_color font-[400] text-[16px] leading-[20px] line-clamp-3 h-[60px] max-h-16">
          {firstSentence}
        </p>
        <div className="flex items-center text-secondary_text_color font-[700] gap-[5px]">
          <p>{author}</p>
          <p>{date}</p>
        </div>

        <div className="relative flex mt-5 gap-[16px]">
          <Button href={cardPath} size="lg" type="primary">
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCards;
