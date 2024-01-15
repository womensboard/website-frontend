'use client';
import { LoadingSpiner } from '@/components/atom/loading-spinner';
import { EditValueMetricsForm, MetricsInput } from '@/components/organism';
import { Editable } from '@/components/organism/Editable';
import Modal from '@/components/organism/modal';
import React, { useEffect, useState } from 'react';
import { ValueMetricsServices } from 'services/home/value-metrics-services';

type ModalName = 'update';

const ValueMetricsSection = () => {
  const [currentMetrics, setCurrentMetrics] = useState<MetricsInput>();

  const [showModal, setShowModal] = useState<ModalName | null>(null);

  const closeModal = () => setShowModal(null);

  const showEditMetrics = (metricsData: MetricsInput) => {
    setCurrentMetrics(metricsData);
    setShowModal('update');
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setUpValueMetrics() {
      const { data: metricsData } = await ValueMetricsServices.fetchMetrics();
      if (metricsData) setCurrentMetrics(metricsData as MetricsInput);

      setLoading(false);
    }
    setUpValueMetrics();
  }, []);

  const handleSubmitMetric = async (values: MetricsInput) => {
    const res = await ValueMetricsServices.updateMetrics(values);
    const newMetricsData = res.data;
    if (res.data) {
      setCurrentMetrics(newMetricsData);
      closeModal();
    }

    return res;
  };

  return (
    <>
      <Editable
        title="Value Metrics"
        onEditBtnClick={() => showEditMetrics(currentMetrics as MetricsInput)}
      >
        {loading && (
          <div>
            Loading Metrics <LoadingSpiner />
          </div>
        )}
        {!loading && (
          <div className="relative">
            <div className="grid grid-flow-col place-content-evenly xl:py-[20px] py-[16px]">
              <div className="text-center font-mulish">
                <h1 className="text-primary_CTA_Color mb-[8px] font-[600] xl:text-[48px] text-[24px]">
                  {currentMetrics?.metricOneValue}
                </h1>
                <p className="font-[400] xl:text-[24px] text-[12px]  text-secondary_text_color">
                  {currentMetrics?.metricOneLabel}
                </p>
              </div>

              <div className="text-center font-mulish">
                <h1 className="text-primary_CTA_Color mb-[8px] font-[600] xl:text-[48px] text-[24px]">
                  {currentMetrics?.metricTwoValue}
                </h1>
                <p className="font-[400] xl:text-[24px] text-[12px]  text-secondary_text_color">
                  {currentMetrics?.metricTwoLabel}
                </p>
              </div>

              <div className="text-center font-mulish">
                <h1 className="text-primary_CTA_Color mb-[8px] font-[600] xl:text-[48px] text-[24px]">
                  {currentMetrics?.metricThreeValue}
                </h1>
                <p className="font-[400] xl:text-[24px] text-[12px]  text-secondary_text_color">
                  {currentMetrics?.metricThreeLabel}
                </p>
              </div>

              <div className="text-center font-mulish">
                <h1 className="text-primary_CTA_Color mb-[8px] font-[600] xl:text-[48px] text-[24px]">
                  {currentMetrics?.metricFourValue}
                </h1>
                <p className="font-[400] xl:text-[24px] text-[12px]  text-secondary_text_color">
                  {currentMetrics?.metricFourLabel}
                </p>
              </div>
            </div>
          </div>
        )}
      </Editable>
      <Modal
        visible={showModal === 'update'}
        title="Edit Value Metrics"
        onClose={closeModal}
      >
        <EditValueMetricsForm
          onClose={closeModal}
          onSubmit={handleSubmitMetric}
          defaults={currentMetrics as MetricsInput}
        />
      </Modal>
    </>
  );
};

export default ValueMetricsSection;
