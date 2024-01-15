'use client';
import { LoadingSpiner } from '@/components/atom/loading-spinner';
import { Editable } from '@/components/organism/Editable';
import {
  EditStrategyForm,
  StrategyType,
  defaultStrategy,
} from '@/components/organism/forms/about';
import Modal from '@/components/organism/modal';
import React, { useEffect, useState } from 'react';
import { StrategyService } from 'services/about/strategy-services';

type ModalName = 'update';

const presentStrategyLine = (line: string) => {
  if (line.startsWith('- ')) return `∙ ${line.slice(2)}`;
  return line;
};
const Strategy = () => {
  const [currentStrategy, setCurrentStrategy] =
    useState<StrategyType>(defaultStrategy);

  const [showModal, setShowModal] = useState<ModalName | null>(null);
  const [loading, setLoading] = useState(true);

  const closeModal = () => setShowModal(null);

  useEffect(() => {
    async function setUpStrategy() {
      const { data: metricsData } = await StrategyService.fetchStrategy();
      if (metricsData) setCurrentStrategy(metricsData as StrategyType);

      setLoading(false);
    }
    setUpStrategy();
  }, []);

  const handleSubmitStrategy = async (values: StrategyType) => {
    const res = await StrategyService.updateStrategy(values);
    const updatedItem = res.data;

    if (res.data) {
      setCurrentStrategy(updatedItem);
      closeModal();
    }
    return res;
  };

  const showEditStrategy = (contentData: StrategyType) => {
    setCurrentStrategy(contentData);
    setShowModal('update');
  };
  return (
    <>
      <Editable
        title="Strategy"
        onEditBtnClick={() => showEditStrategy(currentStrategy as StrategyType)}
      >
        {loading && (
          <div>
            Loading Strategy <LoadingSpiner />
          </div>
        )}
        {!loading && (
          <div className="bg-secondary_color font-mulish text-primary_text_color xl:py-[60px] py-[16px] flex flex-col items-center justify-center">
            <h2 className="font-[600] xl:text-[48px] text-[24px] xl:mb-[24px] mb-[16px]">
              Strategy
            </h2>
            <div className="max-w-[1128px] text-secondary_text_color xl:text-[24px] px-[24px] text-justify text-[16px] font-[400] mx-auto ">
              {currentStrategy?.content.split('\n').map((text, index) => (
                <p key={index}>{presentStrategyLine(text)}</p>
              ))}
            </div>
          </div>
        )}
      </Editable>

      <Modal
        title="Edit Strategy"
        visible={showModal === 'update'}
        onClose={closeModal}
      >
        <EditStrategyForm
          onClose={closeModal}
          defaults={currentStrategy as StrategyType}
          onSubmit={handleSubmitStrategy}
        />
      </Modal>
    </>
  );
};

export default Strategy;
