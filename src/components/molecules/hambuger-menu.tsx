'use client';
import React, { useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import MobileSideBar from '../layout/mobile-sidebar';
import DonateCTALink from './donate-CTA-link';

type HambugerMenuProps = {
  isAdmin: boolean;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const HambugerMenu = (props: HambugerMenuProps) => {
  const { isAdmin, setShowModal, showModal } = props;

  const [handleMenu, setHandleMenu] = useState(false);

  const handleMenuVisibility = () => setHandleMenu(!handleMenu);

  return (
    <div className="lg:hidden flex justify-end gap-[16px] m-[8px_16px]">
      <button onClick={handleMenuVisibility}>
        <BiMenuAltRight size={34} color="#3C3C3C" />
      </button>

      <MobileSideBar
        handleMenu={handleMenu}
        isAdmin={isAdmin}
        handleMenuVisibility={handleMenuVisibility}
      />
      <DonateCTALink showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default HambugerMenu;
