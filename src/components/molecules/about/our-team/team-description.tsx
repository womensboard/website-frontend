'use client';
import { Editable } from '@/components/organism/Editable';
import {
  EditTeamForm,
  TemHeadingType,
  defaultTeamHeading,
} from '@/components/organism/forms/about';
import Modal from '@/components/organism/modal';
import React, { useState, useEffect } from 'react';
import { TeamContentService } from 'services/about/team-content-services';

type ModalName = 'update';

export const TeamDescription = () => {
  const [currentContent, setCurrentContent] =
    useState<TemHeadingType>(defaultTeamHeading);

  const [showModal, setShowModal] = useState<ModalName | null>(null);

  const closeModal = () => setShowModal(null);

  useEffect(() => {
    async function setUpAboutDescription() {
      const { data: teamHeadingData } =
        await TeamContentService.fetchTeamHeading();

      if (teamHeadingData) setCurrentContent(teamHeadingData as TemHeadingType);
    }

    setUpAboutDescription();
  }, []);

  const handleSubmitContent = async (values: TemHeadingType) => {
    const res = await TeamContentService.updateTeamHeading(values);
    const updatedItem = res.data;

    if (res.data) {
      setCurrentContent(updatedItem);
      closeModal();
    }
    return res;
  };

  return (
    <>
      <Editable title="Our Team" onEditBtnClick={() => setShowModal('update')}>
        <div className="flex flex-col items-center justify-center max-w-[1172px] mx-auto xl:pt-[60px] pt-[16px]">
          <p className="text-secondary_text_color xl:text-[24px] px-[24px] text-[16px] font-[400]">
            {currentContent?.content.split('\n').map((paragraph, index) => (
              <span key={index} className="min-h-[2px]">
                {paragraph}
              </span>
            ))}
          </p>
        </div>
      </Editable>

      <Modal
        title="Edit Our Team"
        visible={showModal === 'update'}
        onClose={closeModal}
      >
        <EditTeamForm
          onClose={closeModal}
          defaults={currentContent as TemHeadingType}
          onSubmit={handleSubmitContent}
        />
      </Modal>
    </>
  );
};
