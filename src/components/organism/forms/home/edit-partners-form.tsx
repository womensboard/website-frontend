import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';

import { FormItemWithLabel, FileInputWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';
import { UploadImageService } from 'services/home';

type EditPartnersFormProp = {
  onClose: () => void;
  defaults: PartnersInput;
  onSubmit: SubmitHandler<PartnersInput>;
};

export type PartnersInput = {
  subHeader: string;
  logo: string[];
};

const ecs = '/assets/images/ecs.png';
const naijaCode = '/assets/images/9jacode.png';
const wavecrest = '/assets/images/wavecrest.png';
const iit = '/assets/images/iit.png';
const wetland = '/assets/images/wetland.png';
const pau = '/assets/images/pau.png';

const partnerImages = [ecs, naijaCode, wavecrest, iit, wetland, pau];

export const defaultPartners: PartnersInput = {
  subHeader: 'we are supported by',
  logo: partnerImages,
};

export const PartnersForm = (props: EditPartnersFormProp) => {
  const { onClose, defaults = defaultPartners, onSubmit } = props;

  const { handleSubmit, formValues, handleOnChange, setFormValues, errors } =
    useForm(defaults, onSubmit);

  async function imageChangeHandler(e: SyntheticEvent, files: File[]) {
    e.target;

    const uploadImagesPromises = files.map((imgFile) =>
      UploadImageService.uploadImage('', imgFile)
    );

    const uploadedImageURLs = await Promise.all(uploadImagesPromises);

    setFormValues({
      ...formValues,
      logo: [...formValues.logo, ...uploadedImageURLs],
    });
  }

  async function removeImage(position: number) {
    const newImgValues = [
      ...formValues.logo.slice(0, position),
      ...formValues.logo.slice(position + 1),
    ];

    setFormValues({
      ...formValues,
      logo: newImgValues,
    });
  }

  return (
    <form className="px-2" onSubmit={handleSubmit}>
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
          name="logo"
          label="Logo"
          placeholder="Click here to upload the partner's logo"
          imageURLs={formValues.logo || []}
          fit="contain"
          onImageChange={imageChangeHandler}
          onRemoveImage={removeImage}
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
        <Button htmlType="submit" type="cta" size="modal" rounded={true}>
          Publish
        </Button>
      </div>
    </form>
  );
};
