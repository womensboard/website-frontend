import { ErorrType, FormHandlerReturnType } from 'entities';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

type UseFormControlInput<T> = {
  defaults: T;
  onSubmitForm?: (values: T) => Promise<FormHandlerReturnType> | void;
  onCancel: () => void;
  uploadFile?: (file: File) => Promise<string>;
  defaultErrors?: ErorrType<T>;
};
export function useFormControls<T>(input: UseFormControlInput<T>) {
  const { defaultErrors, defaults, onSubmitForm, onCancel, uploadFile } = input;
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState<typeof defaultErrors>(
    defaultErrors || {}
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (defaultErrors) {
      setErrors(defaultErrors);
    }

    return () => {
      setErrors({});
    };
  }, [defaultErrors]);

  const handleChange = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    setValues((data) => ({ ...data, [name]: value }));
    setErrors((data) => ({ ...data, [name]: '' }));
  }, []);

  const handleImageChange = useCallback(
    async (e: SyntheticEvent<HTMLInputElement>, files: File[]) => {
      if (!uploadFile) return;

      setUploadingImage(true);
      const imgFile = files[0];

      const name = e.currentTarget.name;
      const imgURL = await uploadFile(imgFile);

      setUploadingImage(false);

      setValues((data) => ({
        ...data,
        [name]: imgURL,
      }));
    },
    [uploadFile]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const res = await onSubmitForm?.(values);

      if (res !== 'error') onCancel();
    },
    [onCancel, onSubmitForm, values]
  );

  return {
    values,
    errors,
    uploadingImage,
    handleChange,
    handleSubmit,
    handleImageChange,
    setValues,
  };
}
