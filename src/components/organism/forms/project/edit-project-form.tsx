import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';

import { FormItemWithLabel, FileInputWithLabel } from '../inputs';
import Button from '@/components/atom/button';
import { Project } from '@/components/molecules/project/project-info';
import { SubmitHandler } from 'entities';
import { useForm } from '../use-form';
import { useImageHandler } from '../use-image';
import { CheckboxWithLabel } from '@/components/atom/toggle-checkbox';

type EditProjectFormProps = {
  defaults?: Project;
  onClose: () => void;
  onSubmit: SubmitHandler<Project>;
};

const locationOptions = [
  {
    label: 'Lagos',
    value: 'lagos',
  },
  {
    label: 'Oyo',
    value: 'oyo',
  },
  {
    label: 'Ogun',
    value: 'Ogun',
  },
  {
    label: 'Enugu',
    value: 'enugu',
  },
  {
    label: 'Edo',
    value: 'edo',
  },
];

const defaultValues: Project = {
  title: '',
  location: 'lagos',
  visitURL: '',
  donateLink: '',
  imageURL: '/assets/images/projects/wavecrest-college.png',
  description: '',
  sponsored: false,
};

export const ProjectForm = (props: EditProjectFormProps) => {
  const { defaults = defaultValues, onClose, onSubmit } = props;

  const { handleOnChange, handleSubmit, formValues, setFormValues, errors } =
    useForm(defaults, onSubmit);

  const { handleChangeImage, loadingImage } = useImageHandler(
    formValues,
    setFormValues,
    'imageURL',
    'one'
  );

  function handleCheckBox(e: SyntheticEvent<HTMLInputElement>) {
    e.target;
    setFormValues({ ...formValues, sponsored: !formValues.sponsored });
  }

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        inputType="text"
        label="Title"
        name="title"
        placeholder="Type the title of the project here"
        onChange={handleOnChange}
        value={formValues.title}
        error={errors?.title}
      />
      <FormItemWithLabel
        inputType="textarea"
        label="Subheading"
        name="description"
        placeholder="Type the subheading of the project here"
        onChange={handleOnChange}
        value={formValues.description}
        error={errors?.description}
      />
      <FormItemWithLabel
        inputType="text"
        label="Link to Website"
        name="visitURL"
        placeholder="Provide link to project's website or Social Media handle"
        onChange={handleOnChange}
        value={formValues.visitURL}
        error={errors?.visitURL}
      />
      <FormItemWithLabel
        inputType="text"
        label="Location"
        name="location"
        placeholder="Type location of the project here"
        onChange={handleOnChange}
        options={locationOptions}
        value={formValues.location}
        error={errors?.location}
      />
      <FileInputWithLabel
        name="project-image"
        label="Project Image"
        placeholder="Click here to upload image"
        multiple={false}
        imageURLs={[formValues.imageURL]}
        onImageChange={handleChangeImage}
      />

      <div className="flex items-center gap-[15px]">
        <CheckboxWithLabel
          name="project-sponsored"
          checked={!!formValues.sponsored}
          label="Set as sponsored project"
          onChange={handleCheckBox}
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
        <Button type="cta" size="modal" rounded={true} loading={loadingImage}>
          Publish
        </Button>
      </div>
    </form>
  );
};
