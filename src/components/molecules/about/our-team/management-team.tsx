'use client';
import { Editable } from '@/components/organism/Editable';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import TeamDetails from './team-details';
import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import Modal from '@/components/organism/modal';
import { GoverningCouncilForm } from '@/components/organism/forms/about';
import { ManagementService } from 'services/about/mangement-services';

type ModalNames = 'create' | 'update';

const ManagementTeam = () => {
  const [managements, setManagements] = useState<TeamDetailsData[]>([]);

  useEffect(() => {
    async function setupManagementTeam() {
      const { data: managementData } = await ManagementService.fetchMangement();
      if (managementData) setManagements(managementData);
    }

    setupManagementTeam();
  }, []);

  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const [currentManagement, setCurrentManagement] =
    useState<TeamDetailsType | null>();

  const closeModal = () => setShowModal(null);

  const handleSubmitManagement = async (values: TeamDetailsType) => {
    let res;

    if (showModal === 'create') {
      res = await ManagementService.createMangement(values);
      const newData = res.data;

      if (newData) {
        if (newData) setManagements((items) => [...items, newData]);
        closeModal();
      }
    } else {
      res = await ManagementService.updateMangement(
        currentManagement?.id as string,
        values
      );

      const updatedData = res.data;
      if (updatedData)
        setManagements((items) =>
          items.map((item) => {
            if (item.id === updatedData.id) return updatedData;
            return item;
          })
        );
      closeModal();
    }
    return res;
  };

  const handleDelete = async (managementData: TeamDetailsData) => {
    const res = await ManagementService.deleteManagement(managementData.id);

    if (res.statusCode === 200) {
      setManagements((items) =>
        items.filter((item) => item.id !== managementData.id)
      );
    }
  };

  const showEditManagementTeam = (managementData: TeamDetailsType) => {
    setCurrentManagement(managementData);
    setShowModal('update');
  };

  return (
    <>
      <div className="my-[56px] max-w-[1172px] mx-auto">
        <h3 className="text-primary_CTA_Color font-[600] text-[18px] xl:text-[36px] text-center mb-[24px] xl:mb-[48px]">
          Management Team
        </h3>

        {managements.length > 0 && (
          <h2 className="text-secondary_text_color text-left xl:text-[24px] mb-5 px-[24px] text-[13px] font-[400]">
            The management team comprises of
          </h2>
        )}

        <div className="xl:px-[45px] px-8">
          {managements.length < 1 ? (
            <p className="italic  text-center">No Mangement Team</p>
          ) : (
            <ul className="mb-[10px] grid lg:grid-cols-3 grid-cols-2 xl:gap-14 gap-3">
              {managements.map((singleMangement) => {
                const { name } = singleMangement;

                return (
                  <Editable
                    key={singleMangement.id}
                    title=""
                    onEditBtnClick={() =>
                      showEditManagementTeam(singleMangement)
                    }
                    onDeleteBtnClick={() => handleDelete(singleMangement)}
                  >
                    <TeamDetails name={name} />
                  </Editable>
                );
              })}
            </ul>
          )}
          <Editable
            title="Management Team"
            onAddBtnClick={() => setShowModal('create')}
            hideEditBtn
          >
            <div
              className={clsx(
                'w-[120px] h-[120px]',
                'group-[.is-admin]:inline-block hidden',
                'xl:w-[200px] xl:h-[200px] mt-10 '
              )}
            ></div>
          </Editable>
        </div>
      </div>

      <Modal
        visible={showModal === 'update'}
        title="Edit Mangement"
        onClose={closeModal}
        openAddModal={() => setShowModal('update')}
        addModalButtonTitle="Mangement"
      >
        <GoverningCouncilForm
          onSubmit={handleSubmitManagement}
          defaults={currentManagement as TeamDetailsType}
          onClose={closeModal}
        />
      </Modal>

      <Modal
        visible={showModal === 'create'}
        title="Add Mangement"
        onClose={closeModal}
      >
        <GoverningCouncilForm
          onSubmit={handleSubmitManagement}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default ManagementTeam;
