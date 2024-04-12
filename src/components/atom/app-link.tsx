import React, { ReactNode, SyntheticEvent } from 'react';
import Link from 'next/link';

type AppLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (e: SyntheticEvent<HTMLAnchorElement>) => void;
};

const AppLink = (props: AppLinkProps) => {
  const { children, href, className, onClick } = props;
  const target = href.startsWith('/') ? '_self' : '_blank';
  return (
    <Link href={href} target={target} onClick={onClick} className={className}>
      {children}
    </Link>
  );
};

export default AppLink;
