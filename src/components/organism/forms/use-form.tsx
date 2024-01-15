import { ErorrType, SubmitHandler } from 'entities';
import { SyntheticEvent, useState } from 'react';

export function useForm<T extends object>(
  defaultValues: T,
  onSubmit?: SubmitHandler<T>
) {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<ErorrType<T> | null>(null);

  const handleOnChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;

    const currentErrors = { ...errors } as T;

    delete currentErrors[name as keyof T];
    setErrors(currentErrors);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await onSubmit?.(formValues);
    if (!res) return;

    if (res.errors) setErrors(res.errors);

    if (res.statusCode >= 200 && res.statusCode <= 299) {
      setFormValues(defaultValues);
    }
  };

  return { setFormValues, formValues, handleOnChange, handleSubmit, errors };
}
