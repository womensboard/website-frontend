import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';

import { CloseIcon } from 'components/atom/close-icon';
import Button from '@/components/atom/button';
import { FaPlus } from 'react-icons/fa';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  visible: boolean;
  openAddModal?: () => void;
  addModalButtonTitle?: string;
};

const Modal = (props: ModalProps) => {
  const {
    title,
    children,
    onClose,
    visible = false,
    openAddModal,
    addModalButtonTitle,
  } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [visible]);

  const classNames = clsx(
    'fixed  top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center bg-[#00000031]',
    visible ? 'flex' : 'hidden'
  );

  return (
    <>
      <div
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={classNames}
      >
        <div className="relative w-full h-full text-left max-w-xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className={clsx(
                'absolute top-3 right-2.5',
                'text-gray-400 bg-transparent',
                'rounded-lg text-sm p-1.5 ml-auto inline-flex items-center',
                'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
              )}
              onClick={onClose}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
            <div
              className={clsx(
                'absolute top-3 right-16',
                openAddModal ? 'visible' : 'hidden'
              )}
            >
              <Button
                type="cta-inverse"
                onClick={openAddModal}
                size="xs"
                rounded={true}
              >
                <FaPlus size={16} />
                <div>Add New {addModalButtonTitle}</div>
              </Button>
            </div>
            <div className="md:p-6 p-2 lg:px-8 ">
              <h3 className="mb-6 capitalize text-secondary_text_color font-[600] text-[20px] dark:text-white">
                {title}
              </h3>
              <div className="px-4">
                <div className=" bg-white max-h-[80vh]  pb-10 overflow-y-auto">
                  {visible && children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
