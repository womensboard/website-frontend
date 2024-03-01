import { Dispatch, SyntheticEvent, useState } from 'react';

const useImage = (defaultURLs: string[]) => {
  const [imageURLs, setImageURLs]: [string[], Dispatch<string[]>] =
    useState(defaultURLs);

  function onChange(e: SyntheticEvent, files: File[]) {
    e.target;

    const imgURLs = [];

    for (let i = 0; i < files.length; i++) {
      imgURLs.push(URL.createObjectURL(files[i]));
    }

    setImageURLs(imgURLs);
  }

  function onRemove(position: number) {
    const imgURLs = imageURLs?.filter((url, index) => index !== position);
    setImageURLs(imgURLs);
  }

  return { onChange, onRemove, urls: imageURLs };
};

export default useImage;
