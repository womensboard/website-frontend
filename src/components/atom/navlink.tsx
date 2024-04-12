import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  title: string;
  bold: boolean;
}

const Navlink = ({ href, title, bold = false }: NavLinkProps) => {
  const currentPageClass = bold ? 'font-[800]' : 'font-[500]';
  return (
    <Link
      href={href}
      className={`text-secondary_color ${currentPageClass} text-[20px] font-roboto whitespace-nowrap`}
    >
      {title}
    </Link>
  );
};

export default Navlink;
