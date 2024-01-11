import { Editable } from '@/components/organism/Editable';
import {
  YouthVoicesForm,
  YouthVoicesType,
} from '@/components/organism/forms/UN-collaboration';
import Modal from '@/components/organism/modal';
import React, { useEffect, useState } from 'react';
import { UNCollaborationService } from 'services/un-collaboration';
import Heading from './heading';

export const defaultYouthVoice: YouthVoicesType = {
  subHeading:
    ' Nigerian Youth Voices” is an initiative of Women’s Board to advance the presence of young women in the UN. The group is made out of undergraduates and young professionals (aged 18 – 35) wishing to make their voices heard in the UN international debate. The group circulates information on the UN (appointments, conferences, internships, call of papers, International Youth Day, Annual Youth Assembly, etc) among its members. They submit papers for particular conferences or sessions, participate in surveys or questionnaires and attend youth and gender-related events. They also carry out activities creating awareness on the UN agenda among young people.',
};

type ModalName = 'update';

const YouthVoices = () => {
  const [currentYouthVoice, setCurrentYouthVoice] = useState<YouthVoicesType>();
  const [showModal, setShowModal] = useState<ModalName | null>(null);
  const [youthVoices, setYouthVoices] = useState(defaultYouthVoice);

  useEffect(() => {
    async function setupUNCollaborationPage() {
      const { data: youthVoicesData } =
        await UNCollaborationService.fetchYouthVoices();
      if (youthVoicesData) setYouthVoices(youthVoicesData as YouthVoicesType);
    }
    setupUNCollaborationPage();
  }, []);

  const submitYouthVoices = async (values: YouthVoicesType) => {
    const res = await UNCollaborationService.updateYouthVoices(values);
    const updatedYouthVoices = res.data;

    if (updatedYouthVoices) {
      setYouthVoices(updatedYouthVoices as YouthVoicesType);
      closeModal();
    }

    return res;
  };

  const closeModal = () => setShowModal(null);

  const showEditYouthVoices = (youthVoicesData: YouthVoicesType) => {
    setCurrentYouthVoice(youthVoicesData);
    setShowModal('update');
  };

  return (
    <>
      <Editable
        title="Nigerian Youth Voices"
        onEditBtnClick={() => showEditYouthVoices(youthVoices)}
      >
        <div className="bg-secondary_color">
          <div className="max-w-[1200px]  font-mulish px-[16px] py-[72px] mx-auto">
            <Heading heading="Nigerian Youth Voices" subtext="" />

            <p className="font-[400] xl:text-[24px] leading-[30px] mt-[24px] text-secondary_text_color">
              {youthVoices.subHeading}
            </p>
          </div>
        </div>
      </Editable>

      <Modal
        visible={showModal === 'update'}
        title={'Edit Nigerian Youth Voices'}
        onClose={closeModal}
      >
        <YouthVoicesForm
          onClose={closeModal}
          defaults={currentYouthVoice as YouthVoicesType}
          onSubmit={submitYouthVoices}
        />
      </Modal>
    </>
  );
};

export default YouthVoices;
