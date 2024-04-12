import React from 'react';
import Button from '../atom/button';
import clsx from 'clsx';
import { TbCurrencyNaira } from 'react-icons/tb';

type DonateModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const DonateModal = (props: DonateModalProps) => {
  const { showModal } = props;

  const classNames = clsx(showModal ? 'block shadow-md' : 'hidden');

  return (
    <div
      className={clsx(
        classNames,
        'bg-white absolute xl:top-20 top-11 lg:px-7 border-[2px] lg:py-9 p-4 shadow-md rounded-[20px] flex flex-col items-center justify-center'
      )}
    >
      <div className="flex flex-col gap-3 flex-wrap">
        <Button
          href="https://paystack.com/pay/sifa-projectUSD"
          type="tertiary"
          size="md"
        >
          USD($)
        </Button>

        <Button
          href="https://paystack.com/pay/sifa-projectNGN"
          type="cta"
          size="md"
        >
          NGN
          <TbCurrencyNaira size={25} />
        </Button>
      </div>
    </div>
  );
};

export default DonateModal;
