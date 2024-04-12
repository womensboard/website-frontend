import clsx from 'clsx';

type LabelProps = {
  children: string;
  id?: string;
  hasError?: boolean;
};
export const Label = (props: LabelProps) => {
  const { id, hasError } = props;
  const labelClasses = clsx(
    'block mb-2 font-[400] text-secondary_text_color text-[16px]',

    hasError
      ? 'text-red-700 dark:text-red-500'
      : 'text-gray-900 dark:text-white'
  );

  return (
    <label htmlFor={id} className={labelClasses}>
      {props.children}
    </label>
  );
};
