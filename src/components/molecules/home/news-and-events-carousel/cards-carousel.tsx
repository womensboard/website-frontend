import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card } from './../news-and-events-cards/card';
import clsx from 'clsx';
import SectionHeading from '@/components/atom/section-heading';
import { CardsType } from 'config/news';
import { CarouselSlides } from '@/components/atom';
import { Editable } from '@/components/organism/Editable';

type CardsCarouselProps = {
  heading: string;
  cards: CardsType[];
  cardType: 'news' | 'event';
  onEditCard: (card: CardsType) => void;
};

const CardsCarousel = (props: CardsCarouselProps) => {
  const { heading, cards, cardType, onEditCard } = props;

  return (
    <div
      className={clsx(
        'lg:py-[70px] p-[16px] px-0',
        cardType === 'event' ? 'bg-white' : 'bg-secondary_color'
      )}
    >
      <SectionHeading heading={heading} />

      <CarouselSlides
        items={cards}
        perSlideConfig={{
          xl: 3,
          lg: 2,
          md: 2,
        }}
      >
        {(card) => (
          <Editable
            title={cardType}
            key={card.id}
            onEditBtnClick={() => onEditCard(card)}
          >
            <Card
              headline={''}
              content={''}
              cardPath={
                cardType === 'event'
                  ? `/events/${uuidv4()}`
                  : `/news/${uuidv4()}`
              }
              key={uuidv4()}
              {...card}
              color={cardType === 'event' ? 'grey' : 'white'}
            />
          </Editable>
        )}
      </CarouselSlides>
    </div>
  );
};

export default CardsCarousel;
