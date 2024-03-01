import { ErorrType } from 'entities';

export type FormComponentProps<T> = {
  defaults: T;
  loading?: boolean;
  errors?: ErorrType<T>;
  onSubmitForm?: (values: T) => void;
  onCancel: () => void;
  uploadFile?: (file: File) => Promise<string>;
};
