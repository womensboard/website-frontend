import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TbShare3 } from 'react-icons/tb';
import Button from '@/components/atom/button';
import clsx from 'clsx';

export type CardProps = {
  imageURL: string[];
  headline: string;
  content: string;
  author?: string | boolean;
  color?: 'white' | 'grey';
  date?: string;
  shareTo: string;
  register?: string | boolean;
  cardPath: string;
};

export const Card = (props: CardProps) => {
  const {
    imageURL,
    headline,
    content,
    color = 'white',
    author,
    date,
    shareTo,
    register,
    cardPath,
  } = props;

  return (
    <div className="lg:max-w-[420px] max-w-[343px] relative">
      {imageURL.map((img, index) => {
        return (
          <div
            key={index}
            className="relative lg:w-[420px] w-[343px] lg:h-[320px] h-[240px]"
          >
            <Image
              src={img}
              alt="news-image"
              className="object-cover rounded-[8px_8px_0_0]"
              fill
            />
          </div>
        );
      })}

      <div
        className={clsx(
          'p-[16px] font-mulish text-left rounded-[0px_0px_20px_20px]',
          color === 'white' ? 'bg-white' : 'bg-tertiary_color'
        )}
      >
        <h1 className="text-primary_text_color font-[600] text-[24px]">
          <Link className="hover:text-primary_CTA_Color" href={cardPath}>
            {headline}
          </Link>
        </h1>
        <p className="mt-[8px] mb-[12px] text-secondary_text_color font-[400] text-[16px] leading-[20px] truncate max-h-16">
          {content}
        </p>
        <div className="flex items-center text-secondary_text_color font-[700] gap-[5px]">
          <p>{author}</p>
          <p>{date}</p>
        </div>

        <div className="flex items-center gap-[16px] mt-[20px]">
          {register && (
            <Button href="https://forms.google.com" size="md" type="primary">
              Register
            </Button>
          )}

          <Link
            href={shareTo}
            className="border-[1px] p-[8px] border-primary_CTA_Color rounded-[8px] inline-flex items-center"
          >
            <TbShare3 color="#FB0105" size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};
