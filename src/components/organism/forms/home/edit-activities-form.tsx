import Button from '@/components/atom/button';
import clsx from 'clsx';
import React from 'react';
import { FileInputWithLabel, FormItemWithLabel } from '../inputs';
import { useForm } from '../use-form';
import { useImageHandler } from '../use-image';
import { SubmitHandler } from 'entities';
import { Activities } from '@/components/layout/areas-of-activities';

type ActivitiesFormProps = {
  onSubmit: SubmitHandler<Activities>;
  defaults?: Activities;
  onClose: () => void;
};

const defaultValues: Activities = {
  id: '',
  imageURL: '/assets/images/activities/professional-development.jpg',
  description: '',
};

const EditActivitiesForm = (props: ActivitiesFormProps) => {
  const { onSubmit, onClose, defaults = defaultValues } = props;

  const { handleSubmit, formValues, handleOnChange, errors, setFormValues } =
    useForm(defaults, onSubmit);

  const { handleChangeImage } = useImageHandler(
    formValues,
    setFormValues,
    'imageURL',
    'one'
  );

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Description"
        name="description"
        placeholder="Type the description here"
        onChange={handleOnChange}
        value={formValues.description}
        error={errors?.description}
      />

      <FileInputWithLabel
        name="news-image"
        label="News Image(s)"
        placeholder="Click here to upload image"
        imageURLs={[formValues.imageURL]}
        multiple={false}
        onImageChange={handleChangeImage}
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

export default EditActivitiesForm;
