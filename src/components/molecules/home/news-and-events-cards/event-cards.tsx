'use client';

import Button from '@/components/atom/button';
import { EventInput } from '@/components/organism';
import Image from 'next/image';
import React from 'react';

export type EventCardTypes = EventInput & {
  cardPath: string;
  shareURL: string;
};

const EventCards = (props: EventCardTypes) => {
  const { eventImage, title, body, buttonLabel, cardPath } = props;

  return (
    <div className="lg:max-w-[420px] max-w-[343px] relative">
      <div className="relative lg:w-[420px] w-[343px] lg:h-[320px] h-[240px]">
        <Image
          src={eventImage[0]}
          alt="news-image"
          className="object-cover rounded-[8px_8px_0_0]"
          fill
        />
      </div>

      <div className="p-[16px] font-mulish text-left rounded-[0px_0px_20px_20px] flex flex-col justify-between bg-tertiary_color">
        <div>
          <h1 className="text-primary_text_color font-[600] xl:h-[66px] mb-[20px] text-[20px] xl:text-[24px]">
            {title}
          </h1>
          <p className="mt-[8px] mb-[12px] text-secondary_text_color font-[400] h-[60px] text-[16px] leading-[20px] line-clamp-3 max-h-16">
            {body}
          </p>
        </div>

        <div className="relative flex gap-[16px]">
          <Button href={cardPath} size="lg" type="primary">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EventCards;
