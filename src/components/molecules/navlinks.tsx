'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavlinksData = Navlink[];

type Navlink = {
  title: string;
  href: string;
  adminHref: string;
};

type NavlinksProps = {
  isAdmin: boolean;
  links: Navlink[];
};

const Navlinks = ({ isAdmin, links }: NavlinksProps) => {
  const pathname = usePathname();
  return (
    <div className="lg:flex hidden gap-[46px] text-[20px] font-[500] ">
      {links.map((item, index) => {
        const href = isAdmin ? item.adminHref : item.href;
        const currentClass = pathname?.startsWith(href) // To keep the Nav item Highlighted consistently, e.g the project page bug, that removing highlight from Nav item when navigating to states
          ? 'text-primary_CTA_Color'
          : 'text-secondary_text_color';

        return (
          <Link key={index} href={href} className={`${currentClass}`}>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
