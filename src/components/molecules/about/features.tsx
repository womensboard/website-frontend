'use client';
import { Editable } from '@/components/organism/Editable';
import { EditFeaturesForm } from '@/components/organism/forms/about';
import Modal from '@/components/organism/modal';
import clsx from 'clsx';
import { AboutFeatureItem } from 'entities/about';
import React, { useEffect, useState } from 'react';
import { FeatureService } from 'services/about/feature-services';

export const deafultFeatures: AboutFeatureItem[] = [
  {
    header: 'Vision Statement',
    subHeader:
      'The Women’s Board strives for a society which recognizes the dignity of women and appreciates their invaluable contribution.',
  },
  {
    header: 'Mission Statement',
    subHeader:
      'To foster the development of the individual Nigerian woman, empowering her with education and high standards of work and inculcating in her a commitment of service to the community so as to make her a citizen better equipped to participate in the social progress of the country',
  },
  {
    header: 'Funding',
    subHeader:
      'Operational costs are met by the fees of the participants of the programmes and income generating activities carried out in the Projects. Deficits in programmes for low-income target groups are financed by contributions of friends, funds raised by the development committees and other small grants. The setting up of new Projects or the development of an existing one involving a certain investment or huge cost is done by co-financed ventures with International Development Agencies, Northern NGOs, individuals and corporate donations etc',
  },
  {
    header: 'Strategy',
    subHeader:
      'We pursue our objectives through educational activities carried out by Projects set-up with a long term vision in different parts of the country. The Lagoon Executive Secretarial College was the first project of the organization established in 1973. It offered young women a specialized professional training for administrative and secretarial career. The Secretarial College was discontinued in 1995 so as to attend to more relevant development Projects.',
  },
  {
    header: 'Objectives',
    subHeader:
      'The main objectives related to the mission are to develop leadership qualities, to emphasize the integrity of life, to provide work skills, to foster a responsible attitude to work, to introduce basic organizational practices, to be committed to civic duties, to create environmental awareness, to strengthen institutional capacity of NGOs.',
  },
];

type ModalName = 'update';

const FeaturesSection = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [showModal, setShowModal] = useState<ModalName | null>(null);

  const closeModal = () => {
    setCurrentItemIndex(-1);
    setShowModal(null);
  };

  const [features, setFeatures] = useState<AboutFeatureItem[]>(deafultFeatures);

  useEffect(() => {
    async function setupAboutPage() {
      const { data: featuresData } = await FeatureService.fetchAllFeatures();
      if (featuresData) setFeatures(featuresData);
    }

    setupAboutPage();
  }, []);

  const showEditFeatures = (index: number) => {
    setCurrentItemIndex(index);
    setShowModal('update');
  };

  const handleSubmit = async (values: AboutFeatureItem) => {
    const newFeatures = [...features];
    newFeatures[currentItemIndex] = values;

    const res = await FeatureService.updateFeatures(newFeatures);
    const newMetricsData = res.data;
    if (res.data) {
      setFeatures(newMetricsData);
      closeModal();
    }

    return res as any;
  };

  return (
    <>
      <div className="divide-y ">
        {features.map((feature, index) => (
          <Editable
            key={index}
            title={features[index].header}
            onEditBtnClick={() => showEditFeatures(index)}
          >
            <div
              className={clsx(
                index % 2 === 0 ? 'bg-secondary_color' : ' bg-white'
              )}
            >
              <div
                className={clsx(
                  'flex font-mulish gap-[20px] max-w-[1172px] px-[32px] xl:px-0 w-full mx-auto justify-between items-center py-[32px] xl:py-[66px]',
                  index % 2 === 0 ? '' : 'flex-row-reverse'
                )}
              >
                <h2 className="font-[600] text-[18px] xl:text-[36px]">
                  {feature.header}
                </h2>
                <p className="max-w-[578px] text-secondary_text_color font-[400] xl:leading-[30px] leading-[17px] text-[14px] xl:text-[24px]">
                  {feature.subHeader}
                </p>
              </div>
            </div>
          </Editable>
        ))}
      </div>
      <Modal
        title={`Edit ${features[currentItemIndex]?.header}`}
        visible={showModal === 'update'}
        onClose={closeModal}
      >
        <EditFeaturesForm
          onClose={closeModal}
          onSubmit={handleSubmit}
          defaults={features[currentItemIndex]}
        />
      </Modal>
    </>
  );
};

export default FeaturesSection;
