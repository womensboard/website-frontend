'use client';
import React, { ReactNode, useCallback, useState } from 'react';
import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';

import { CancelOrSubmit } from 'components/organism';
import Modal from '../modal';
import clsx from 'clsx';

type EditableProps = {
  title: string;
  newsTitle?: string;
  children: ReactNode;
  onEditBtnClick?: () => void;
  onDeleteBtnClick?: () => void;
  onAddBtnClick?: () => void;
  onAddNewsClick?: () => void;
  hideEditBtn?: boolean;
};
export const Editable = (props: EditableProps) => {
  const {
    title,
    newsTitle,
    children,
    hideEditBtn,
    onEditBtnClick,
    onDeleteBtnClick,
    onAddBtnClick,
    onAddNewsClick,
  } = props;
  const [showModal, setShowModal] = useState(false);

  const buttonClassnames =
    'flex items-center gap-[16px] px-[16px] text-white text-admin_font_size lg:text-admin_font_size_md hover:bg-admin_overlay_bg_color';

  const toggleDelete = useCallback(() => {
    setShowModal((showDeleteModal) => !showDeleteModal);
  }, []);

  const handleDelete = useCallback(() => {
    toggleDelete();
    onDeleteBtnClick?.();
  }, [onDeleteBtnClick, toggleDelete]);

  return (
    <div className="relative">
      <div>{children}</div>

      {onDeleteBtnClick && (
        <Modal
          title="Are you sure you want to delete?"
          visible={showModal}
          onClose={toggleDelete}
        >
          <CancelOrSubmit
            submitText="Delete"
            onCancel={toggleDelete}
            htmlType="button"
            onSubmit={handleDelete}
          />
        </Modal>
      )}

      <div className="absolute hidden group-[.is-admin]:flex inset-0 h-full w-full z-[1] items-center justify-center rounded bg-admin_overlay_bg_color hover:border-gray-300 border-transparent border-4 border-spacing-3">
        <div className="flex flex-col items-center justify-center flex-wrap sm:divide-x sm:flex-row max-w-sm">
          {!hideEditBtn && (
            <button className={buttonClassnames} onClick={onEditBtnClick}>
              <FaPen />
              <div>Edit {title}</div>
            </button>
          )}

          {onDeleteBtnClick && (
            <button
              className={clsx(buttonClassnames, '')}
              onClick={toggleDelete}
            >
              <FaTrashAlt />
              <div>Delete {title}</div>
            </button>
          )}
          <div className="flex flex-col gap-5">
            {onAddNewsClick && (
              <button
                className={clsx(buttonClassnames, 'border-transparent ')}
                onClick={onAddNewsClick}
              >
                <FaPlus />
                <div>Add {newsTitle}</div>
              </button>
            )}
            {onAddBtnClick && (
              <button
                className={clsx(buttonClassnames, 'border-transparent ')}
                onClick={onAddBtnClick}
              >
                <FaPlus />
                <div>Add {title}</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
