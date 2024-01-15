import React, { SyntheticEvent, useRef } from 'react';
import Image from 'next/image';
import { CloseIcon } from '@/components/atom/close-icon';
import { FileInputProps } from './form-Item';
import clsx from 'clsx';

export type OnImageChange = (
  e: SyntheticEvent<HTMLInputElement>,
  files: File[]
) => void;

export type OnRemoveImage = (position: number) => void;

const getClassname = (hasError: boolean) =>
  clsx(
    'rounded-lg border h-20 w-full font-mulish',
    hasError ? 'bg-red-50 border-red-500 text-red-900' : 'bg-secondary_color'
  );

const fitConfig = {
  contain: 'object-contain',
  cover: 'object-cover',
};

type MultipleFileInputProps = FileInputProps & {
  imageURLs: string[];
  className?: string;
  fit?: keyof typeof fitConfig;
  onImageChange: OnImageChange;
  onRemoveImage?: OnRemoveImage;
};

const MultipleFileInput = (props: MultipleFileInputProps) => {
  const {
    imageURLs,
    name,
    error,
    placeholder,
    fit = 'cover',
    onRemoveImage,
    onImageChange,
    multiple = true,
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    onImageChange(e, files);
  };

  const handleRemoveImage = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!onRemoveImage) return;
    const position = e.currentTarget.dataset.position;
    if (typeof position === 'undefined') return;
    onRemoveImage(+position);
  };

  return (
    <div>
      {imageURLs.map((image, index) => (
        <div key={index} className="h-[160px] w-full relative mb-4">
          <Image
            src={image}
            fill
            alt={`Image ${index}`}
            className={clsx('rounded-l-lg rounded-r-lg border', fitConfig[fit])}
          />
          {onRemoveImage && (
            <button
              type="button"
              className="absolute w-8 h-8 bg-white rounded-full right-4 top-4 grid place-items-center  border-2 shadow-md"
              data-position={index}
              onClick={handleRemoveImage}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      ))}

      <input
        type="file"
        name={name}
        className="hidden"
        ref={fileRef}
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
        multiple={multiple}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={getClassname(!!error)}
      >
        {placeholder || 'Select Image'}
      </button>
    </div>
  );
};

export default MultipleFileInput;
