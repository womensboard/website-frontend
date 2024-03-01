import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './card';

interface OtherNewsHeadingProp {
  heading: string;
}

const newsAndEventsDetails: any[] = [];

const Others = ({ heading }: OtherNewsHeadingProp) => {
  return (
    <div className="bg-secondary_color flex flex-col items-center px-[70px]">
      <h3 className="pt-[52px] font-[600px] text-secondary_text_color text-[32px] mb-[40px]">
        {`Other ${heading} `}
      </h3>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-[20px] pb-[172px]">
        {newsAndEventsDetails.slice(0, 3).map((detail) => {
          const { imageURL, headline, content, author, shareTo } = detail;
          return (
            <Card
              key={uuidv4()}
              imageURL={imageURL}
              headline={headline}
              content={content}
              author={heading === 'News' && author}
              register={heading === 'News' ? false : true}
              shareTo={shareTo}
              cardPath={
                heading === 'News' ? `/news/${uuidv4()}` : `/events/${uuidv4()}`
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Others;
