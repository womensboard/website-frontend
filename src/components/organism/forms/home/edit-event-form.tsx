import React from 'react';
import clsx from 'clsx';

import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { FileInputWithLabel, FormItemWithLabel } from '../inputs';
import { SubmitHandler } from 'entities';
import { useImageHandler } from '../use-image';

export type EventInput = {
  title: string;
  body: string;
  buttonLabel: string;
  eventImage: string[];
  shareURL: string;
  buttonURL: string;
};

export type EventData = EventInput & {
  id: string;
};

type EditNewsFormProps = {
  onSubmit: SubmitHandler<EventInput>;
  defaults?: EventInput;
  onClose: () => void;
};

const defaultValues: EventInput = {
  title: '',
  body: '',
  buttonLabel: '',
  shareURL: '',
  buttonURL: '',
  eventImage: ['/assets/images/heroSectionImage.jpeg'],
};

export const EventForm = (props: EditNewsFormProps) => {
  const { onSubmit, onClose, defaults = defaultValues } = props;

  const { handleOnChange, handleSubmit, formValues, setFormValues, errors } =
    useForm(defaults, onSubmit);

  const { loadingImage, handleChangeImage, handleRemoveImage } =
    useImageHandler(formValues, setFormValues, 'eventImage', 'multiple');

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Title"
        name="title"
        placeholder="Type the news title here"
        onChange={handleOnChange}
        value={formValues.title}
        error={errors?.title}
      />
      <FormItemWithLabel
        inputType="textarea"
        label="Body"
        name="body"
        placeholder="Type the news content here"
        onChange={handleOnChange}
        value={formValues.body}
        error={errors?.body}
      />
      <FormItemWithLabel
        inputType="text"
        label="Button Label"
        name="buttonLabel"
        placeholder="Register"
        onChange={handleOnChange}
        value={formValues.buttonLabel}
        error={errors?.buttonLabel}
      />
      <FormItemWithLabel
        inputType="text"
        label="Visit URL"
        name="buttonURL"
        placeholder="Visit URL"
        onChange={handleOnChange}
        value={formValues.buttonURL}
        error={errors?.buttonURL}
      />

      <FileInputWithLabel
        name="eventImage"
        label="Event Image(s)"
        placeholder="Click here to upload image"
        imageURLs={formValues.eventImage || []}
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
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          loading={loadingImage}
          htmlType="submit"
          type="cta"
          size="modal"
          rounded={true}
        >
          Publish
        </Button>
      </div>
    </form>
  );
};
