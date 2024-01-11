import Button from '@/components/atom/button';
import { FormItemWithLabel } from '@/components/organism';
import clsx from 'clsx';
import { SubmitHandler } from 'entities';
import React from 'react';
import { useForm } from '../use-form';

type EditTeamFormProps = {
  onClose: () => void;
  defaults: TemHeadingType;
  onSubmit: SubmitHandler<TemHeadingType>;
};

export type TemHeadingType = {
  content: string;
};

export const defaultTeamHeading: TemHeadingType = {
  content:
    'Our organization is managed by a Council of Management chosen by the Board. The Council attends to the promotion and actual setting-up of new Projects as well as to their possible further development. The day-to-day running of each Project, once it starts is entrusted to Management Teams who enjoy delegated authority and are accountable to the Council. Most of the Management Teams count on the help of a Development Committee made up of a group of professionals who work voluntarily, with advisory capacity assisting the Management Team technically and financially',
};

export const EditTeamForm = (props: EditTeamFormProps) => {
  const { onClose, defaults = defaultTeamHeading, onSubmit } = props;

  const { handleSubmit, formValues, handleOnChange, errors } = useForm(
    defaults,
    onSubmit
  );

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        name="content"
        inputType="textarea"
        label="Content"
        placeholder="Type your Team description here"
        onChange={handleOnChange}
        value={formValues.content}
        error={errors?.content}
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
