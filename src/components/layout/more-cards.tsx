import React, { useState } from 'react';
import { CardsType } from 'config/news';
import { Card } from '../molecules/home/news-and-events-cards/card';
import { v4 as uuidv4 } from 'uuid';

type MoreCardsProps = {
  pageHeading: string;
  color: string;
  cardDetails: CardsType[];
};

const MoreCards = (props: MoreCardsProps) => {
  const { pageHeading, cardDetails, color } = props;

  const [cardsToShow, setCardsToShow] = useState<number>(9);

  const loadMoreCards = () => {
    setCardsToShow(cardsToShow + 3);
  };
  const visibleCards = cardDetails.slice(0, cardsToShow);

  return (
    <div className="flex flex-col items-center py-[52px] bg-secondary_color">
      <h1 className="text-center  pb-[40px] font-mulish font-[600] text-[36px] ">
        {pageHeading}
      </h1>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] justify-items-center ">
        {visibleCards.splice(0, cardsToShow).map((detail) => {
          const { id } = detail;

          return (
            <Card
              {...detail}
              headline={''}
              content={''}
              key={id}
              cardPath={
                color === 'white' ? `/events/${uuidv4()}` : `/news/${uuidv4()}`
              }
            />
          );
        })}
      </div>

      <button
        onClick={loadMoreCards}
        className="text-primary_CTA_Color font-mulish font-[700] text-[20px] text-center mt-[40px] "
      >{`View More ${pageHeading}`}</button>
    </div>
  );
};

export default MoreCards;
