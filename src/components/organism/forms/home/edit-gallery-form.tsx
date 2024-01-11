import React from 'react';
import { FileInputWithLabel, FormItemWithLabel } from '../inputs';
import { useForm } from '../use-form';
import Button from '@/components/atom/button';
import clsx from 'clsx';
import { SubmitHandler } from 'entities';
import { useImageHandler } from '../use-image';

const gallery1 = '/assets/images/gallery1.png';
const gallery2 = '/assets/images/gallery2.png';
const gallery3 = '/assets/images/gallery3.png';
const gallery4 = '/assets/images/gallery4.png';

export type GalleryInput = {
  subHeader: string;
  imageURL: string[];
};

export const defaultGallery: GalleryInput = {
  subHeader: 'Gallery',
  imageURL: [gallery1, gallery2, gallery3, gallery4],
};
type EditGalleryFormProps = {
  onClose: () => void;
  defaults: GalleryInput;
  onSubmit: SubmitHandler<GalleryInput>;
};

const EditGalleryForm = (props: EditGalleryFormProps) => {
  const { onClose, defaults = defaultGallery, onSubmit } = props;

  const { handleSubmit, formValues, handleOnChange, errors, setFormValues } =
    useForm(defaults, onSubmit);

  const { loadingImage, handleChangeImage, handleRemoveImage } =
    useImageHandler(formValues, setFormValues, 'imageURL', 'multiple');

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-[24px]">
        <FormItemWithLabel
          inputType="text"
          label="Subheader"
          name="subHeader"
          placeholder="Type in your subheading here"
          onChange={handleOnChange}
          value={formValues.subHeader}
          error={errors?.subHeader}
        />
        <FileInputWithLabel
          name="gallery"
          label="Gallery"
          placeholder="Click here to upload gallery"
          imageURLs={formValues.imageURL || []}
          fit="contain"
          onImageChange={handleChangeImage}
          onRemoveImage={handleRemoveImage}
        />
      </div>

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

export default EditGalleryForm;
