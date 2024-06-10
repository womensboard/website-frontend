'use client';
import React from 'react';
import { Navlink, navlinksData } from './navlinksData';
import Link from 'next/link';
import { CiFacebook } from 'react-icons/ci';
import { TbBrandLinkedin } from 'react-icons/tb';
import { AiOutlineInstagram } from 'react-icons/ai';
import { Icon } from '@iconify/react';

type FooterProps = {
  isAdmin?: boolean;
  links?: Navlink[];
};

const Footer = (props: FooterProps) => {
  const { isAdmin = false, links = navlinksData } = props;

  const date = new Date();
  const currentYear = date.getFullYear();

  const socialIcons = [
    {
      icon: <CiFacebook size={30} />,
      href: 'https://facebook.com/womensboard.com.ng',
    },
    {
      icon: <AiOutlineInstagram size={30} />,
      href: 'https://www.instagram.com/womens_board/',
    },
    {
      icon: <TbBrandLinkedin size={30} />,
      href: 'https://www.linkedin.com/company/wb-ecs/?originalSubdomain=ng',
    },
    {
      icon: (
        <Icon icon="ri:twitter-x-line" color="white" width="25" height="25" />
      ),
      href: 'https://twitter.com/women_board',
    },
  ];
  return (
    <div className="font-mulish font-[400] text-white md:p-[42px_70px] p-[20px_16px] bg-primary_text_color">
      <div className="flex lg:flex-row flex-col gap-5 lg:gap-0 items-center justify-between mb-[24px] md:mb-[48px]">
        <div className="flex items-center md:gap-[16px] gap-[12px]">
          {socialIcons.map((icon, index) => (
            <Link key={index} href={icon.href} target="_blank">
              {icon.icon}
            </Link>
          ))}
        </div>

        <div className="md:gap-[46px] gap-[12px] flex md:text-[20px] text-[10px] font-[500] ">
          {links.map((item, index) => {
            const href = isAdmin ? item.adminHref : item.href;
            return (
              <Link key={index} href={href} className="text-white">
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>

      <p className="md:text-[16px] text-[8px] text-center">
        &copy; {currentYear} Women’s Board, All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
