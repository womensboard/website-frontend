import React from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import Navlink from './navlink';
import { useRouter } from 'next/router';

interface LinkData {
  title: string;
  href: string;
}

export type NavLinksProps = {
  prefix?: string;
  navLinks: LinkData[];
};

const NavLinks = (props: NavLinksProps) => {
  const { prefix = '', navLinks } = props;
  const router = useRouter();

  const lastIndex = navLinks.length - 1;
  return (
    <div className="md:flex item-center h-full  md:gap-[36px]">
      {navLinks.map((item, index) => {
        let href = item.href;
        if (href.startsWith('/') && !href.startsWith(prefix)) {
          href = `${prefix}${href}`;
        }
        return (
          <div
            key={index}
            className="flex items-center mb-[10px] md:mb-[0] gap-[11px]"
          >
            <Navlink
              href={href}
              title={item.title}
              bold={router.pathname == item.href}
            />
            {index === lastIndex && <BsBoxArrowUpRight />}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
