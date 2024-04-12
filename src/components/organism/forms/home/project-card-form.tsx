import Image from 'next/image';
import React, { SyntheticEvent } from 'react';
import MultipleFileInput from '../inputs/multiple-file-input';
import { CancelOrSubmit } from '@/components/organism';
import { FormItemWithLabel } from '@/components/organism/forms/inputs/form-Item';
import { FormComponentProps } from '../types';
import { useFormControls } from 'hooks';

const statusOptions = [
  {
    label: 'Ongoing',
    value: 'ongoing',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
  {
    label: 'Current',
    value: 'current',
  },
];

type FormImageItemProps = {
  id: string;
  name: string;
  src: string;
  onFileChange: (e: SyntheticEvent<HTMLInputElement>) => void;
};
export const FormImageItem = (props: FormImageItemProps) => {
  const { id, name, src, onFileChange } = props;

  return (
    <div>
      <div>
        <label htmlFor={id} className="block relative h-72">
          <Image src={src} alt={name} fill className="object-cover" />
        </label>
      </div>

      <input
        type="file"
        name={name}
        id={id}
        onChange={onFileChange}
        accept="image/*"
      />
    </div>
  );
};

export const ProjectCardForm = (props: FormComponentProps<any>) => {
  const {
    defaults,
    loading = false,
    errors: defaultErrors,
    onSubmitForm,
    onCancel,
    uploadFile,
  } = props;

  // useEffect(() => {
  //   setValues(defaults);
  // }, [defaults]);

  const formProps = useFormControls({
    defaults,
    defaultErrors,
    onSubmitForm,
    uploadFile,
    onCancel,
  });

  const { values, errors, handleSubmit, handleImageChange, handleChange } =
    formProps;

  return (
    <form className="space-y-6 px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        onChange={handleChange}
        name="heading"
        inputType="text"
        label="Project Name"
        placeholder="Operation feed the nation"
        error={errors?.heading}
        value={values.heading}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="description"
        inputType="textarea"
        label="Project Details"
        placeholder="Enter project details"
        error={errors?.description}
        value={values.description}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="volunteerLink"
        inputType="text"
        label="Link to volunteer"
        error={errors?.volunteerLink}
        value={values.volunteerLink}
      />

      <FormItemWithLabel
        onChange={handleChange}
        name="volunteerLabel"
        inputType="text"
        label="Volunteer Label"
        error={errors?.volunteerLabel}
        value={values.volunteerLabel}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="donateLink"
        inputType="text"
        label="Link to donate"
        placeholder="http://paystack.com/"
        error={errors?.donateLink}
        value={values.donateLink}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="donateLabel"
        inputType="text"
        label="Donate Button Label"
        placeholder="Enter Donate Button Label"
        value={values.donateLabel}
        error={errors?.donateLabel}
      />

      <FormItemWithLabel
        onChange={handleChange}
        name="waitlistLink"
        inputType="text"
        label="Link to waitlist"
        value={values.waitlistLink}
        error={errors?.waitlistLink}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="waitlistLabel"
        inputType="text"
        label="Waitlist Label"
        value={values.waitlistLabel}
        error={errors?.waitlistLabel}
      />
      <FormItemWithLabel
        onChange={handleChange}
        name="status"
        inputType="text"
        label="Project Status"
        placeholder="Active|Completed"
        options={statusOptions}
        value={values.status}
        error={errors?.status}
      />
      <MultipleFileInput
        imageURLs={[values.imageURL]}
        name="imageURL"
        onImageChange={handleImageChange}
      />
      <CancelOrSubmit
        loading={loading}
        submitText="Publish"
        onCancel={onCancel}
      />
    </form>
  );
};

export default ProjectCardForm;
