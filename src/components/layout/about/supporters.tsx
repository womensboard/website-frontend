'use client';

import { Editable } from '@/components/organism/Editable';
import SupportersForm, {
  DefaultSupporters,
} from '@/components/organism/forms/about/edit-supporters-form';
import Modal from '@/components/organism/modal';
import { SupportersConfig } from 'config/supporters';
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { SupporterService } from 'services/about/supporters-service';

type ModalNames = 'create' | 'update';

const Supporters = () => {
  const [supportersInfo, setSupportersInfo] = useState<SupportersConfig>(
    {} as SupportersConfig
  );

  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const [currentSupporter, setCurrentSupporter] = useState<number>(0);

  useEffect(() => {
    async function setupSupporters() {
      const { data: supportersData } = await SupporterService.fetchSupporters();
      if (supportersData) setSupportersInfo(supportersData);
    }

    setupSupporters();
  }, []);

  const handleSubmitSupporters = async (values: DefaultSupporters) => {
    let res;

    if (showModal === 'create') {
      const updatedDescription = values.description;
      const newSupporter = values.supporter;

      const updatedSupporters = [...supportersInfo.supporters, newSupporter];

      const updatedData: SupportersConfig = {
        description: updatedDescription,
        supporters: updatedSupporters,
      };

      res = await SupporterService.createSupporter(updatedData);
      const newData = res.data;

      if (newData) {
        setSupportersInfo(newData);
        closeModal();
      }
    } else if (showModal === 'update') {
      const updatedSupporter = values.supporter;

      const supportersArr = [...supportersInfo.supporters];

      supportersArr[currentSupporter] = updatedSupporter;

      const updatedData = {
        ...supportersInfo,
        supporters: supportersArr,
      };

      const res = await SupporterService.createSupporter(updatedData);

      const newData = res.data;

      if (newData) {
        setSupportersInfo(newData);
        closeModal();
      }
    }

    return res;
  };

  const showEditSupporter = (index: number) => {
    setCurrentSupporter(index);
    setShowModal('update');
  };

  const deleteSupporter = async (index: number) => {
    const updatedSupporter = [...supportersInfo.supporters];
    updatedSupporter.splice(index, 1);

    const updatedData = {
      ...supportersInfo,
      supporters: updatedSupporter,
    };

    const res = await SupporterService.createSupporter(updatedData);

    const newData = res.data;

    if (newData) setSupportersInfo(newData);
  };

  const closeModal = () => setShowModal(null);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center max-w-[1172px] mx-auto xl:pt-[60px] pt-[16px]">
          <p className="text-secondary_text_color xl:text-[24px] px-[24px] font-[400] font-mulish">
            {supportersInfo.description}
          </p>
        </div>

        <div className="flex justify-center items-center my-5">
          <ul className="grid grid-cols-2 place-content-between gap-10 text-secondary_text_color xl:text-[22px] text-[12px] px-[24px] font-[400] font-mulish lg:my-10 lg:leading-8">
            {supportersInfo?.supporters?.sort().map((supporter, index) => {
              return (
                <Editable
                  key={index}
                  title=""
                  onEditBtnClick={() => showEditSupporter(index)}
                  onDeleteBtnClick={() => deleteSupporter(index)}
                >
                  <li className="list-disc max-w-[566px]">{supporter}</li>
                </Editable>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="bg-admin_overlay_bg_color text-admin_font_size hover:border-gray-300 text-white h-60 w-full hidden justify-center items-center  group-[.is-admin]:flex"
          onClick={() => setShowModal('create')}
        >
          <div className="flex items-center">
            <FaPlus className="mr-5" />
            <span> Add Supporter</span>
          </div>
        </button>
      </div>

      <Modal
        visible={showModal === 'update'}
        title="Edit Supporter"
        onClose={closeModal}
      >
        <SupportersForm
          onSubmit={handleSubmitSupporters}
          defaults={supportersInfo as unknown as DefaultSupporters}
          onClose={closeModal}
        />
      </Modal>

      <Modal
        visible={showModal === 'create'}
        title="Add Supporter"
        onClose={closeModal}
      >
        <SupportersForm
          onSubmit={handleSubmitSupporters}
          defaults={supportersInfo as unknown as DefaultSupporters}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default Supporters;
