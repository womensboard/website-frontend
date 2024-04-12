import React from 'react';
import clsx from 'clsx';

import { FormItemWithLabel, FileInputWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

import { HeroDetailData, HeroSectionInput } from 'entities/hero';
import { useImageHandler } from '../use-image';

type EditHeroFormProp = {
  onCancel: () => void;
  defaults: HeroSectionInput;
  page: HeroDetailData['page'];
  onSubmit?: SubmitHandler<HeroSectionInput>;
};

const defaultHeroSectionData: HeroSectionInput = {
  imageURL: [
    '/assets/images/heroSectionImage.jpeg',
    '/assets/images/heroSectionImage.jpeg',
    '/assets/images/heroSectionImage.jpeg',
    '/assets/images/heroSectionImage.jpeg',
  ],
  header: "Women's Board Impact Lives",
  subHeader:
    "Women's Board is an NGO with a Special Consultative Status with the Economic and Social Council of the United Nations. We are als associated with the Department of Public Information of the United Nations.",
};

export const HeroForm = (props: EditHeroFormProp) => {
  const { onCancel, defaults = defaultHeroSectionData, onSubmit, page } = props;

  const { handleOnChange, handleSubmit, setFormValues, formValues, errors } =
    useForm(defaults, onSubmit);

  const { loadingImage, handleChangeImage, handleRemoveImage } =
    useImageHandler(formValues, setFormValues, 'imageURL', 'multiple');

  const { header, subHeader } = formValues;

  return (
    <form className="space-y-6 px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Header"
        name="header"
        placeholder="Type in your heading here"
        value={header}
        error={errors?.header}
        onChange={handleOnChange}
      />

      <FormItemWithLabel
        inputType="textarea"
        label="Subheader"
        name="subHeader"
        placeholder="Type in your subheading here"
        value={subHeader}
        error={errors?.subHeader}
        onChange={handleOnChange}
      />

      <FileInputWithLabel
        name="hero-image"
        label="Background Image(s)"
        placeholder="Click here to upload image"
        imageURLs={formValues.imageURL || []}
        error={errors?.imageURL}
        multiple={page === 'home' ? true : false}
        onImageChange={handleChangeImage}
        onRemoveImage={handleRemoveImage}
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          type="cta"
          size="modal"
          rounded={true}
          loading={loadingImage}
        >
          Publish
        </Button>
      </div>
    </form>
  );
};
