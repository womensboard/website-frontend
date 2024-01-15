'use client';
import { Editable } from '@/components/organism/Editable';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import TeamDetails from './team-details';
import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import Modal from '@/components/organism/modal';
import { GoverningCouncilForm } from '@/components/organism/forms/about';
import { CouncilService } from 'services/about/board-service';

type ModalNames = 'create' | 'update';

const GoverningCouncil = () => {
  const [council, setCouncil] = useState<TeamDetailsData[]>([]);

  useEffect(() => {
    async function setupGoverningCouncil() {
      const { data: councilData } = await CouncilService.fetchCouncil();
      if (councilData) setCouncil(councilData);
    }

    setupGoverningCouncil();
  }, []);

  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const [currentCouncil, setCurrentCouncil] =
    useState<TeamDetailsType | null>();

  const closeModal = () => setShowModal(null);

  const handleSubmitCouncil = async (values: TeamDetailsType) => {
    let res;

    if (showModal === 'create') {
      res = await CouncilService.createCouncil(values);
      const newData = res.data;

      if (newData) {
        if (newData) setCouncil((items) => [...items, newData]);
        closeModal();
      }
    } else {
      res = await CouncilService.updateCouncil(
        currentCouncil?.id as string,
        values
      );

      const updatedData = res.data;
      if (updatedData)
        setCouncil((items) =>
          items.map((item) => {
            if (item.id === updatedData.id) return updatedData;
            return item;
          })
        );
      closeModal();
    }
    return res;
  };

  const showEditCouncil = (councilData: TeamDetailsType) => {
    setCurrentCouncil(councilData);
    setShowModal('update');
  };

  const handleDelete = async (councilData: TeamDetailsData) => {
    const res = await CouncilService.deleteCouncil(councilData.id);

    if (res.statusCode === 200) {
      setCouncil((items) => items.filter((item) => item.id !== councilData.id));
    }
  };

  return (
    <>
      <div className="xl:mb-[90px] mb-0 max-w-[1172px] mx-auto">
        <h3 className="text-primary_CTA_Color font-[600] text-[18px] xl:text-[36px] text-center mb-[24px] xl:mb-[48px]">
          Governing Council
        </h3>

        {council.length > 1 && (
          <h2 className="text-secondary_text_color text-left xl:text-[24px] mb-5 px-[24px] text-[13px] font-[400]">
            The Governing Council is made up of people with a wealth of
            experience in various fields. They include
          </h2>
        )}

        <div className="xl:px-[45px] px-8">
          {council.length == 0 ? (
            <p className="italic flex items-center justify-center text-center">
              No Governing Council
            </p>
          ) : (
            <ul className="mb-[10px] grid lg:grid-cols-3 grid-cols-2 xl:gap-14 gap-3">
              {council.map((singleCouncilMember) => {
                const { name } = singleCouncilMember;

                return (
                  <Editable
                    title=""
                    key={singleCouncilMember.id}
                    onEditBtnClick={() => showEditCouncil(singleCouncilMember)}
                    onDeleteBtnClick={() => handleDelete(singleCouncilMember)}
                  >
                    <TeamDetails name={name} />
                  </Editable>
                );
              })}
            </ul>
          )}

          <Editable
            title="Governing Council"
            onAddBtnClick={() => setShowModal('create')}
            hideEditBtn
          >
            <div
              className={clsx(
                'w-[120px] h-[120px]',
                'xl:w-[200px] xl:h-[200px]',
                'group-[.is-admin]:inline-block hidden'
              )}
            ></div>
          </Editable>
        </div>
      </div>

      <Modal
        visible={showModal === 'update'}
        title="Edit Governing Council"
        onClose={closeModal}
      >
        <GoverningCouncilForm
          onSubmit={handleSubmitCouncil}
          defaults={currentCouncil as TeamDetailsType}
          onClose={closeModal}
        />
      </Modal>

      <Modal
        visible={showModal === 'create'}
        title="Add Governing Council"
        onClose={closeModal}
      >
        <GoverningCouncilForm
          onSubmit={handleSubmitCouncil}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default GoverningCouncil;
