import {
  Dispatch,
  SetStateAction,
  useCallback,
  SyntheticEvent,
  useState,
} from 'react';
import { UploadImageService } from 'services/home';

export function useImageHandler<T>(
  formValues: T,
  setFormValues: Dispatch<SetStateAction<T>>,
  key: keyof T,
  mode: 'multiple' | 'one'
) {
  const [loadingImage, setLoadingImage] = useState(false);
  const handleChangeImage = useCallback(
    async (e: SyntheticEvent, files: File[]) => {
      e.target;

      const sliceEnd = mode === 'one' ? 1 : undefined;

      setLoadingImage(true);
      const uploadedImagesPromises = files
        .slice(0, sliceEnd)
        .map((file) => UploadImageService.uploadImage('', file));
      const imgURLs = await Promise.all(uploadedImagesPromises);
      setLoadingImage(false);

      const currentValue = formValues[key];
      if (typeof currentValue === 'string') {
        setFormValues({ ...formValues, [key]: imgURLs[0] });
      } else if (mode === 'one') {
        setFormValues({ ...formValues, [key]: imgURLs });
      } else if (Array.isArray(currentValue)) {
        setFormValues({
          ...formValues,
          [key]: [...currentValue, ...imgURLs],
        });
      }
    },
    [formValues, key, mode, setFormValues]
  );

  const handleRemoveImage = useCallback(
    (position: number) => {
      const currentImgURLs = formValues[key];
      if (!Array.isArray(currentImgURLs)) return;

      const newImageURLs = currentImgURLs?.filter(
        (url, index) => index !== position
      );

      setFormValues({
        ...formValues,
        [key]: newImageURLs,
      });
    },
    [formValues, key, setFormValues]
  );

  return { loadingImage, handleChangeImage, handleRemoveImage };
}
