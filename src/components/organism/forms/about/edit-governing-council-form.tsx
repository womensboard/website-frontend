import Button from '@/components/atom/button';
import { FormItemWithLabel } from '@/components/organism';
import clsx from 'clsx';
import { TeamDetailsType } from 'config/our-team';
import React from 'react';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

type TeamMemberFormProps = {
  onSubmit: SubmitHandler<TeamDetailsType>;
  defaults?: TeamDetailsType;
  onClose: () => void;
};

const defaultValues: TeamDetailsType = {
  name: '',
};

export const GoverningCouncilForm = (props: TeamMemberFormProps) => {
  const { onSubmit, onClose, defaults = defaultValues } = props;

  const { handleOnChange, handleSubmit, formValues, errors } = useForm(
    defaults,
    onSubmit
  );

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Label"
        name="name"
        placeholder="Type the member's name here"
        onChange={handleOnChange}
        value={formValues.name}
        error={errors?.name}
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
