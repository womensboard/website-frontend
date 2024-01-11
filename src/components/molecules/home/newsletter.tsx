import React from 'react';
import NewsLetterForm from '../newsletter-form';

const Newsletter = () => {
  return (
    <div className="font-mulish text-primary_text_color border-[1px] mx-[20px] lg:mx-[62px] border-primary_text_color mb-[36px] max-w-[1249px] xl:mx-auto lg:mt-[36px] mt-[24px]">
      <div className="bg-secondary_color p-[16px] lg:p-[48px_62px_48px_62px] relative bottom-[10px] right-[10px] lg:bottom-[20px] lg:right-[25px] rounded-[24px_0px_0px_0px]  ">
        <h2 className="font-[600] text-[20px] lg:text-[36px]">
          Bi-Annual Newsletter
        </h2>
        <p className="font-[500] text-[12px] lg:text-[24px] text-secondary_text_color">
          Subscribe to receive our Bi-Annual Newsletter newsletters and stay
          updated on our latest news and activities.
        </p>

        <NewsLetterForm />
      </div>
    </div>
  );
};

export default Newsletter;
