import React from 'react';
import clsx from 'clsx';
import { FormItemWithLabel, FileInputWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';
import { useImageHandler } from '../use-image';

export type NewsInput = {
  title: string;
  description: string;
  author: string;
  imageURL: string[];
  createdAt: Date;
};
export type NewsData = NewsInput & {
  id: string;
};

const defaultValues: NewsInput = {
  title: '',
  description: '',
  author: '',
  imageURL: ['/assets/images/heroSectionImage.jpeg'],
  createdAt: new Date(),
};

type NewsFormProps = {
  onSubmit: SubmitHandler<NewsInput>;
  defaults?: NewsInput;
  onClose: () => void;
};

export const NewsForm = (props: NewsFormProps) => {
  const { onSubmit, onClose, defaults = defaultValues } = props;

  const { handleOnChange, handleSubmit, formValues, setFormValues, errors } =
    useForm(defaults, onSubmit);

  const { loadingImage, handleChangeImage, handleRemoveImage } =
    useImageHandler(formValues, setFormValues, 'imageURL', 'multiple');

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
        name="description"
        placeholder="Type the news content here"
        onChange={handleOnChange}
        value={formValues.description}
        error={errors?.description}
      />
      <FormItemWithLabel
        inputType="text"
        label="Author"
        name="author"
        placeholder="Type the author’s name here"
        onChange={handleOnChange}
        value={formValues.author}
        error={errors?.author}
      />
      <FileInputWithLabel
        name="news-image"
        label="News Image(s)"
        placeholder="Click here to upload image"
        imageURLs={formValues.imageURL}
        multiple={true}
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
