'use client';

import React, { SyntheticEvent, useState } from 'react';
import Button from '../atom/button';
import { useMailChimpForm } from 'use-mailchimp-form';

type NewsLetterForm = {
  EMAIL: string;
};

const newsLetterURL = process.env
  .NEXT_PUBLIC_MAILCHIMP_NEWSLETTER_URL as string;

const defaultValue = {
  EMAIL: '',
};

const NewsLetterForm = () => {
  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(newsLetterURL);
  const [formValue, setFormValue] = useState<NewsLetterForm>(defaultValue);

  const handleOnChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    handleSubmit(formValue);

    if (message === 'Thank you for subscribing!') {
      setFormValue(defaultValue);
    }
  };

  return (
    <form className="lg:mt-[44px] mt-[36px]" onSubmit={handleFormSubmit}>
      <div className="flex">
        <input
          required
          type="email"
          name="EMAIL"
          id="EMAIL"
          value={formValue.EMAIL}
          onChange={handleOnChange}
          placeholder="Email address"
          className="bg-white border-none lg:h-[60px] h-[42px] lg:w-[575px] min-w-[170px] rounded-[15px_0px_0px_15px] p-[18px_20px] "
        />

        <Button htmlType="submit" type="subscribe" size="md">
          Subscribe
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center mb-5 font-roboto italic font-[500]">
        {loading && 'submitting'}
        {error && <span className="text-primary_CTA_Color"> {message}</span>}
        {success && <span className="text-green-600"> {message}</span>}
      </div>
    </form>
  );
};

export default NewsLetterForm;
