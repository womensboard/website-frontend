'use client';
import { Editable } from '@/components/organism/Editable';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import TeamDetails from './team-details';
import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import Modal from '@/components/organism/modal';
import { TrusteeForm } from '@/components/organism/forms/about';
import { TrusteeService } from 'services/about/trustees-services';

type ModalNames = 'create' | 'update';

const Trustees = () => {
  const [trustees, setTrustees] = useState<TeamDetailsData[]>([]);

  useEffect(() => {
    async function setupTrustees() {
      const { data: trusteesData } = await TrusteeService.fetchTrustee();
      if (trusteesData) setTrustees(trusteesData);
    }

    setupTrustees();
  }, []);

  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const [currentTrustees, setCurrentTrustees] =
    useState<TeamDetailsType | null>();

  const closeModal = () => setShowModal(null);

  const handleSubmitTrustee = async (values: TeamDetailsType) => {
    let res;

    if (showModal === 'create') {
      res = await TrusteeService.createTrustee(values);
      const newData = res.data;

      if (newData) {
        if (newData) setTrustees((items) => [...items, newData]);
        closeModal();
      }
    } else {
      res = await TrusteeService.updateTrustee(
        currentTrustees?.id as string,
        values
      );

      const updatedData = res.data;

      if (updatedData)
        setTrustees((items) =>
          items.map((item) => {
            if (item.id === updatedData.id) return updatedData;
            return item;
          })
        );
      closeModal();
    }
    return res;
  };

  const showEditTrustee = (trusteeData: TeamDetailsType) => {
    setCurrentTrustees(trusteeData);
    setShowModal('update');
  };

  const handleDelete = async (trusteeData: TeamDetailsData) => {
    const res = await TrusteeService.deleteTrustee(trusteeData.id);

    if (res.statusCode === 200) {
      setTrustees((items) =>
        items.filter((item) => item.id !== trusteeData.id)
      );
    }
  };

  return (
    <>
      <div className="mb-[56px] xl:mb-[90px] max-w-[1172px] mx-auto">
        <h3 className="text-primary_CTA_Color font-[600] text-[18px] xl:text-[36px] text-center mb-[24px] xl:mb-[48px]">
          Trustees
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-[30px] ">
          {trustees.length < 1 ? (
            <p>No Trustee</p>
          ) : (
            trustees.map((singleTrustee) => {
              const { name } = singleTrustee;

              return (
                <Editable
                  key={singleTrustee.id}
                  title=""
                  onEditBtnClick={() => showEditTrustee(singleTrustee)}
                  onDeleteBtnClick={() => handleDelete(singleTrustee)}
                >
                  <TeamDetails name={name} />
                </Editable>
              );
            })
          )}
          <Editable
            title=""
            onAddBtnClick={() => setShowModal('create')}
            hideEditBtn
          >
            <div
              className={clsx(
                'w-[120px] h-[120px]',
                'xl:w-[200px] xl:h-[200px]'
              )}
            ></div>
          </Editable>
        </div>
      </div>

      <Modal
        visible={showModal === 'update'}
        title="Edit Trustee"
        onClose={closeModal}
        openAddModal={() => setShowModal('create')}
        addModalButtonTitle="Trustee"
      >
        <TrusteeForm
          onSubmit={handleSubmitTrustee}
          defaults={currentTrustees as TeamDetailsType}
          onClose={closeModal}
        />
      </Modal>

      <Modal
        visible={showModal === 'create'}
        title="Add Trustee"
        onClose={closeModal}
      >
        <TrusteeForm onSubmit={handleSubmitTrustee} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Trustees;
