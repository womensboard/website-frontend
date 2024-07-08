'use client';
import React from 'react';
import { mobileNavlinksData } from '../molecules/navlinksData';
import Link from 'next/link';
import clsx from 'clsx';
import Logo from '../atom/logo';
import { CancelButton } from '../atom/cancel-button';
import { usePathname } from 'next/navigation';
import SocialIcons from '../molecules/social-icons';

type MobileSideBarProp = {
  handleMenu: boolean;
  isAdmin: boolean;
  handleMenuVisibility: () => void;
};

const MobileSideBar = (props: MobileSideBarProp) => {
  const { handleMenu, isAdmin = false, handleMenuVisibility } = props;

  const pathname = usePathname();

  return (
    <div
      className={clsx(
        handleMenu ? 'translate-none' : '-translate-x-full',
        'w-full h-screen z-10 absolute top-0 left-0 transition-transform bg-primary_color'
      )}
    >
      <div className="flex justify-between p-[24px_16px]">
        <Logo isAdmin={isAdmin} />

        <div className="flex gap-[16px]">
          <div onClick={handleMenuVisibility}>
            <CancelButton />
          </div>
        </div>
      </div>
      <div className="grid pt-[40px]  ">
        {mobileNavlinksData.map((item, index) => {
          const href = isAdmin ? item.adminHref : item.href;
          const currentClass =
            pathname === href && 'bg-primary_CTA_Color text-white';

          return (
            <Link
              key={index}
              href={href}
              className={` p-[14px_30px] font-mulish font-[500] text-[14px] ${currentClass} `}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="lg:hidden flex p-[14px_30px] pt-10">
        <SocialIcons />
      </div>
    </div>
  );
};

export default MobileSideBar;
