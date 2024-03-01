import clsx from 'clsx';
import useMedia, { BreakPointSizes } from 'hooks/use-media';
import React, { ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';

const defaultItemsPerSlide: Record<BreakPointSizes, number> = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
  xl: 3,
};

type CarouselSlidesProps<T> = {
  items: T[];
  itemsPerSlideInMobile?: number;
  interval?: number;
  transitionTime?: number;
  children: (item: T, i: number) => ReactNode;
  perSlideConfig?: Partial<Record<BreakPointSizes, number>>;
};

export function CarouselSlides<T>(props: CarouselSlidesProps<T>) {
  const { items, interval = 5000, transitionTime = 2000, children } = props;

  const { breakpoint } = useMedia();
  const perSlideConfig = {
    ...defaultItemsPerSlide,
    ...props.perSlideConfig,
  };

  const itemPerSlide = perSlideConfig[breakpoint];
  const slides = [];

  for (let i = 0; i < items?.length; i += itemPerSlide) {
    const slideItems = items.slice(i, i + itemPerSlide);
    slides.push(slideItems);
  }

  return (
    <Carousel
      autoFocus
      autoPlay
      axis="horizontal"
      interval={interval}
      transitionTime={transitionTime}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      infiniteLoop
    >
      {slides.map((slideItems, index) => (
        <div
          key={index}
          className={clsx(
            'flex',
            slideItems.length <= itemPerSlide
              ? 'justify-evenly'
              : 'justify-evenly'
          )}
        >
          {slideItems.map((item, i) => children(item, i))}
        </div>
      ))}
    </Carousel>
  );
}
