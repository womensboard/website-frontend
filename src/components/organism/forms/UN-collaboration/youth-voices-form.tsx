import React from 'react';
import clsx from 'clsx';

import { FormItemWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { defaultYouthVoice } from '@/components/molecules/un-collaboration/youth-voices';
import { SubmitHandler } from 'entities';

type EditYouthVoicesFormProp = {
  onClose: () => void;
  defaults: YouthVoicesType;
  onSubmit: SubmitHandler<YouthVoicesType>;
};

export type YouthVoicesType = {
  subHeading: string;
};

export const YouthVoicesForm = (props: EditYouthVoicesFormProp) => {
  const { onClose, onSubmit, defaults = defaultYouthVoice } = props;

  const { formValues, errors, handleOnChange, handleSubmit } = useForm(
    defaults,
    onSubmit
  );

  return (
    <form className="space-y-6 px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="textarea"
        label="Subheading"
        name="subHeading"
        placeholder="Type in the subheading here"
        onChange={handleOnChange}
        value={formValues.subHeading}
        error={errors?.subHeading}
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
