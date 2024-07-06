'use client';

import React, { useState } from 'react';
import Navlinks from '../molecules/navlinks';
import DonateCTALink from '../molecules/donate-CTA-link';
import HambugerMenu from '../molecules/hambuger-menu';
import Logo from '../atom/logo';
import { navlinksData } from '../molecules/navlinksData';
import SocialIcons from '../molecules/social-icons';
import clsx from 'clsx';
import Button from '../atom/button';

type NavbarProps = {
  isAdmin?: boolean;
};

const Navbar = ({ isAdmin = false }: NavbarProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="">
      <div
        className={clsx(
          'flex items-center lg:relative sticky top-0 z-50 bg-primary_color justify-between font-mulish mx-auto lg:p-[12px_70px]'
        )}
      >
        <Logo isAdmin={isAdmin} />
        <HambugerMenu
          isAdmin={isAdmin}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <div className="lg:flex hidden">
          <SocialIcons />
        </div>
      </div>

      <div className="sticky top-0 shadow-lg flex items-center justify-between z-[5] bg-secondary_color font-mulish mx-auto lg:p-[30px_70px]">
        <Navlinks isAdmin={isAdmin} links={navlinksData} />
        <div className="lg:flex hidden gap-5">
          <Button
            href="https://sites.google.com/view/our-resource/resources"
            type="tertiary"
            size="normal"
          >
            Resources
          </Button>
          <DonateCTALink showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
