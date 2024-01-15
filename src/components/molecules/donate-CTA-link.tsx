'use client';

import React from 'react';
import Button from '../atom/button';
import DonateModal from '../layout/donate-modal';

type DonateProp = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const DonateCTALink = (props: DonateProp) => {
  const { showModal, setShowModal } = props;

  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="flex items-center gap-[24px] relative">
        <Button size="md" type="primary" onClick={handleModal}>
          Donate
        </Button>
      </div>

      <DonateModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default DonateCTALink;
