import React from 'react';
import { FormItemWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import clsx from 'clsx';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

type SupportersFormProps = {
  onClose: () => void;
  defaults?: DefaultSupporters;
  onSubmit: SubmitHandler<DefaultSupporters>;
};

export type DefaultSupporters = {
  description: string;
  supporter: string;
};

const defaultSupporters: DefaultSupporters = {
  description: '',
  supporter: '',
};

const SupportersForm = (props: SupportersFormProps) => {
  const { onClose, defaults = defaultSupporters, onSubmit } = props;

  const { handleSubmit, formValues, handleOnChange, errors } = useForm(
    defaults,
    onSubmit
  );
  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        name="supporter"
        inputType="text"
        label="Supporter"
        placeholder="Enter Supporters Description here"
        onChange={handleOnChange}
        value={formValues.supporter}
        error={errors?.supporter}
      />

      <div
        className={clsx(
          'flex gap-[24px] justify-center mt-[32px] pt-[16px] pb-[32px]',
          'md:mt-[40px]'
        )}
      >
        <Button
          htmlType="button"
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

export default SupportersForm;
