import clsx from 'clsx';
import Link from 'next/link';
import { LoadingSpiner } from './loading-spinner';
import { ReactNode } from 'react';

const typeMapper = {
  primary: 'bg-primary_CTA_Color text-white border-none text-primary_color',
  secondary: 'bg-primary_color',
  tertiary: 'border-primary_CTA_Color border-1 text-primary_CTA_Color ',
  subscribe: 'bg-primary_text_color text-white rounded-[0px_15px_15px_0px]',
  cta: 'bg-primary_CTA_Color text-white',
  'cta-plain': 'text-primary_CTA_Color border-0 gap-[12px] p-0',
  'cta-inverse': 'border border-primary_CTA_Color text-primary_CTA_Color',
  danger: 'bg-danger border border-danger text-white',
};
const sizeMapper = {
  xs: 'p-[6px_3px]  text-[12px]',
  sm: 'px-4  text-[12px] h-9',
  md: 'lg:p-[13px_34px] p-[8px_12px]',
  lg: 'p-[16px] text-[18px]',
  xl: ' w-[200px] h-[60px] text-[20px] font-[500]',
  normal: 'px-4 h-auto',
  modal:
    'w-[120px] h-[48px] text-[14px] md:w-[200px] md:h-[60px] md:text-[20px]',
};

type Shared = {
  children: ReactNode;
  onClick?: () => void;
  stretch?: boolean;
  size?: keyof typeof sizeMapper;
  type?: keyof typeof typeMapper;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

type BaseButtonProps = Shared & {
  htmlType?: 'submit' | 'button';
};

type LinkButtonProps = Shared & {
  href: string;
};

export type ButtonProps = LinkButtonProps | BaseButtonProps;

const Button = (props: ButtonProps) => {
  const {
    children,
    size = 'normal',
    stretch = false,
    type = 'primary',
    rounded = true,
    disabled = false,
    loading = false,
    onClick,
  } = props;
  const className = clsx(
    'leading-none border flex items-center justify-center',
    sizeMapper[size],
    typeMapper[type],
    stretch ? 'w-full' : '',
    rounded ? 'rounded-[8px]' : ''
  );

  if ('href' in props) {
    return (
      <Link
        className={className}
        href={props.href}
        target={props.href?.startsWith('https') ? '_blank' : ''}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={props.htmlType}
      className={className}
      disabled={loading || disabled}
    >
      {children}

      {loading && (
        <span className="ml-3">
          <LoadingSpiner />
        </span>
      )}
    </button>
  );
};

export default Button;
