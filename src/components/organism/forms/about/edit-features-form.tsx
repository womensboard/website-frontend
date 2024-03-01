import Button from '@/components/atom/button';
import { deafultFeatures } from '@/components/molecules/about/features';
import { FormItemWithLabel } from '@/components/organism';
import clsx from 'clsx';
import { SubmitHandler } from 'entities';
import React from 'react';
import { useForm } from '../use-form';
import { AboutFeatureItem } from 'entities/about';

type EditFeaturesFormProps = {
  onClose: () => void;
  defaults?: AboutFeatureItem;
  onSubmit: SubmitHandler<AboutFeatureItem, AboutFeatureItem[]>;
};

export const EditFeaturesForm = (props: EditFeaturesFormProps) => {
  const { onClose, onSubmit, defaults = deafultFeatures[0] } = props;

  const { handleOnChange, handleSubmit, formValues, errors } = useForm(
    defaults,
    onSubmit
  );
  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        name="header"
        inputType="text"
        label="Header"
        placeholder="Type your heading here"
        onChange={handleOnChange}
        error={errors?.header}
        value={formValues.header}
      />
      <FormItemWithLabel
        name="subHeader"
        inputType="textarea"
        label="SubHeader"
        placeholder="Type your subheading here"
        onChange={handleOnChange}
        error={errors?.subHeader}
        value={formValues.subHeader}
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
