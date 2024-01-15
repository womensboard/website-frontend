import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import Detail from './detail';

type CardDetailsProps = {
  imageURL: string[];
  title: string;
  description: string;
  author?: string;
  date?: string;
  shareURL: string;
  buttonLabel?: string;
  buttonURL?: string;
};

const CardDetails = (props: CardDetailsProps) => {
  const {
    imageURL,
    title,
    description,
    author,
    date,
    shareURL,
    buttonLabel,
    buttonURL,
  } = props;

  return (
    <div className="font-mulish">
      <Navbar />

      <div className="mt-[52px]">
        <Detail
          imageURL={imageURL}
          headline={title}
          content={description}
          author={author}
          date={date}
          shareURL={shareURL}
          buttonLabel={buttonLabel}
          buttonURL={buttonURL}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CardDetails;
