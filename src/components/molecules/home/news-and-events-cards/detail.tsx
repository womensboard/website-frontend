import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type CardDetailsProps = {
  imageURL: string[];
  headline: string;
  content: string;
  author?: string;
  date?: string;
  register?: boolean;
  shareURL: string;
  buttonLabel?: string;
  buttonURL?: string;
};

const Detail = (props: CardDetailsProps) => {
  const { imageURL, headline, content, author, date } = props;

  return (
    <div className="font-mulish max-w-[1180px] mx-auto text-left bg-white">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        stopOnHover={true}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {imageURL &&
          imageURL.map((data, index) => {
            return (
              <div key={index} className="relative">
                <div className="w-full relative h-[500px]">
                  <Image
                    src={data}
                    alt="image-1"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
      </Carousel>
      <div className="p-[48px_24px]">
        <h1 className="text-primary_text_color font-[600] text-[24px] lg:text-[40px]">
          {headline}
        </h1>
        <p className="mt-[32px] mb-[20px] text-secondary_text_color font-[400] text-[16px] lg:text-[24px] leading-[20px] lg:leading-[39px]">
          {content}
        </p>
        <div className="flex items-center text-secondary_text_color font-[700] gap-[5px]">
          <p>{author}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
