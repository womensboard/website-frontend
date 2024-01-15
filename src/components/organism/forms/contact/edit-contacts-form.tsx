import React from 'react';
import clsx from 'clsx';

import { FormItemWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

export type ContactDetailInput = {
  officeAddress: string;
  emailAddress: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
};

type EditContactsFormProp = {
  onClose: () => void;
  defaults: ContactDetailInput;
  onSubmit: SubmitHandler<ContactDetailInput>;
};

export const defaultValues: ContactDetailInput = {
  officeAddress:
    '75, Adisa Bashua Street, Off Adelabu Street, Surulere Lagos. +234 803 2174 572',
  emailAddress: 'wb@womensboard.org.ng',
  twitter: '@women_board',
  facebook: '@womensboard.com.ng',
  instagram: '@womens_board',
  linkedIn: '@womens_board',
};

export const EditContactsForm = (props: EditContactsFormProp) => {
  const { onClose, onSubmit, defaults = defaultValues } = props;

  const { handleOnChange, handleSubmit, errors, formValues } = useForm(
    defaults,
    onSubmit
  );

  return (
    <form className="space-y-6 px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Office Address"
        name="officeAddress"
        placeholder="Type the company's address here"
        onChange={handleOnChange}
        value={formValues.officeAddress}
        error={errors?.officeAddress}
      />
      <FormItemWithLabel
        inputType="text"
        label="Email Address"
        name="emailAddress"
        placeholder="Type the company's email address here"
        onChange={handleOnChange}
        value={formValues.emailAddress}
        error={errors?.emailAddress}
      />
      <FormItemWithLabel
        inputType="text"
        label="Twitter"
        name="twitter"
        placeholder="Type the company's twitter handle here"
        onChange={handleOnChange}
        value={formValues.twitter}
        error={errors?.twitter}
      />
      <FormItemWithLabel
        inputType="text"
        label="Facebook"
        name="facebook"
        placeholder="Type the company's Facebook handle here"
        onChange={handleOnChange}
        value={formValues.facebook}
        error={errors?.facebook}
      />
      <FormItemWithLabel
        inputType="text"
        label="Instagram"
        name="instagram"
        placeholder="Type the company's Instagram handle here"
        onChange={handleOnChange}
        value={formValues.instagram}
        error={errors?.instagram}
      />
      <FormItemWithLabel
        inputType="text"
        label="LinkedIn"
        name="linkedIn"
        placeholder="Type the company's LinkedIn profile name here"
        onChange={handleOnChange}
        value={formValues.linkedIn}
        error={errors?.linkedIn}
      />

      <div
        className={clsx(
          'flex gap-[24px] justify-center mt-[32px] pt-[16px] pb-[32px]',
          'md:mt-[40px]'
        )}
      >
        <Button
          htmlType={'button'}
          type="cta-inverse"
          size="modal"
          rounded={true}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button htmlType="submit" type="cta" size="modal" rounded={true}>
          Publish
        </Button>
      </div>
    </form>
  );
};
