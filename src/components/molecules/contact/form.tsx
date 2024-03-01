import Button from '@/components/atom/button';
import { FormItemWithLabel } from '@/components/organism';
import { useForm } from '@/components/organism/forms/use-form';
import { useMailChimpForm } from 'use-mailchimp-form';
import React, { SyntheticEvent } from 'react';

type ContactForm = {
  NAME: string;
  EMAIL: string;
  SUBJECT: 'partnership' | 'sponsorship' | 'enquiries' | 'others';
  MESSAGE: string;
};

const options = [
  {
    value: 'partnership',
    label: 'Partnership',
  },
  {
    value: 'sponsorship',
    label: 'Sponsorship',
  },
  {
    value: 'enquiries',
    label: 'Enquiries',
  },
  {
    value: 'others',
    label: 'Others',
  },
];

const defaultValues: ContactForm = {
  NAME: '',
  EMAIL: '',
  SUBJECT: 'partnership',
  MESSAGE: '',
};

const contactFormURL = process.env.NEXT_PUBLIC_MAILCHIMP_CONTACT_URL as string;

const Form = () => {
  const { formValues, setFormValues, handleOnChange } = useForm(defaultValues);

  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(contactFormURL);

  const handleSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    handleSubmit(formValues);
    if (success || error) setFormValues(defaultValues);
  };

  return (
    <div className="lg:mt-[104px] mt-[40px]">
      <h3 className="text-primary_CTA_Color text-center md:mb-[64px] font-[600] text-[14px] md:text-[24px] ">
        or send a direct message via this form below
      </h3>

      <form
        className="max-w-[640px] p-[40px_16px] mx-auto"
        onSubmit={handleSubmitForm}
      >
        <FormItemWithLabel
          required
          name="NAME"
          id="NAME"
          inputType="text"
          label="Name"
          placeholder="Enter your Full Name"
          onChange={handleOnChange}
          value={formValues.NAME}
        />

        <FormItemWithLabel
          required
          name="EMAIL"
          id="EMAIL"
          inputType="email"
          label="Email Address"
          placeholder="Enter your Email Address"
          onChange={handleOnChange}
          value={formValues.EMAIL}
        />

        <FormItemWithLabel
          required
          name="SUBJECT"
          id="SUBJECT"
          inputType="text"
          label="Subject"
          options={options}
          onChange={handleOnChange}
          value={formValues.SUBJECT}
        />

        <FormItemWithLabel
          required
          name="MESSAGE"
          id="MESSAGE"
          inputType="textarea"
          label="Message"
          placeholder="Enter your Message"
          onChange={handleOnChange}
          value={formValues.MESSAGE}
        />

        <div className="flex justify-center">
          <Button
            htmlType="submit"
            type="cta"
            size="md"
            disabled={loading}
            loading={loading}
            rounded
          >
            Send
          </Button>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center mb-5  font-roboto italic font-[500]">
        {loading && <span className="text-gray-700">submitting</span>}
        {success && <span className="text-green-500">{message}</span>}
      </div>
    </div>
  );
};

export default Form;
