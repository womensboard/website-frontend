import React from 'react';
import clsx from 'clsx';

import { FormItemWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { SubmitHandler } from 'entities';
import { useForm } from '../use-form';
import { CollaborationItem } from 'config/collaborations';

type ContributionFormProps = {
  onCancel: () => void;
  defaults?: CollaborationItem;
  onSubmit?: SubmitHandler<CollaborationItem>;
  section: 'contribution' | 'conference';
};

const date = new Date();

const defaultYear = date.getFullYear();

const defaultContribution: CollaborationItem = {
  id: '',
  section: 'contribution',
  year: defaultYear,
  activities: [''],
};

export const CollaborationForm = (props: ContributionFormProps) => {
  const { onCancel, defaults = defaultContribution, onSubmit, section } = props;

  defaults.section = section;

  const { formValues, errors, handleOnChange, handleSubmit } = useForm(
    defaults,
    onSubmit
  );

  return (
    <form className="space-y-6 px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Section"
        name="section"
        value={formValues.section}
        onChange={handleOnChange}
        error={errors?.section}
        placeholder={section}
      />

      <FormItemWithLabel
        inputType="text"
        label="Year"
        name="year"
        value={formValues.year.toString()}
        onChange={handleOnChange}
        error={errors?.year}
        placeholder="Enter the year"
      />

      <FormItemWithLabel
        inputType="textarea"
        label="Activities"
        name="activities"
        onChange={handleOnChange}
        value={formValues.activities}
        error={errors?.activities}
        placeholder="Seperate each bullet points to new lines..."
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
        <Button type="cta" size="modal" rounded={true}>
          Publish
        </Button>
      </div>
    </form>
  );
};
