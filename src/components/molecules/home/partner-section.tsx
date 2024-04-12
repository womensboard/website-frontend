'use client';
import { LoadingSpiner } from '@/components/atom/loading-spinner';
import {
  PartnersForm,
  PartnersInput,
  defaultPartners,
} from '@/components/organism';
import { Editable } from '@/components/organism/Editable';
import Modal from '@/components/organism/modal';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { PartnersServices } from 'services/home/partners-services';

type ModalNames = 'update';

const PartnerSection = () => {
  const [currentPartners, setCurrentPartners] =
    useState<PartnersInput>(defaultPartners);

  const [showModal, setShowModal] = useState<ModalNames | null>(null);

  const closeModal = () => setShowModal(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setupPartnersSection() {
      const { data: partnersData } = await PartnersServices.fetchPartner();
      if (partnersData) setCurrentPartners(partnersData as PartnersInput);

      setLoading(false);
    }
    setupPartnersSection();
  }, []);

  const handleSubmitPartners = async (values: PartnersInput) => {
    const res = await PartnersServices.createPartner(values);
    const updatedItem = res.data;

    if (res.data) {
      setCurrentPartners(updatedItem);
      closeModal();
    }
    return res;
  };

  const showEditPartners = (partnersData: PartnersInput) => {
    setCurrentPartners(partnersData);
    setShowModal('update');
  };

  const carouselElem = useRef<HTMLInputElement>(null);
  return (
    <>
      <Editable
        title="Partners"
        onEditBtnClick={() =>
          showEditPartners(currentPartners as PartnersInput)
        }
      >
        {loading && (
          <div>
            Loading Partners <LoadingSpiner />
          </div>
        )}
        {!loading && (
          <div className="bg-tertiary_color lg:p-[60px_70px] p-[16px]">
            <h3 className="text-center text-primary_text_color font-[500] lg:mb-[24px] mb-[16px] lg:text-[28px] text-[20px] font-mulish">
              {currentPartners?.subHeader}
            </h3>

            <div className="relative">
              <div
                ref={carouselElem}
                className="w-full max-w-[1260px] mx-auto overflow-x-hidden scroll-smooth"
              >
                <div className={clsx('flex lg:py-[40px] py-[16px] mx-auto')}>
                  <div className="flex lg:gap-[100px] gap-[50px] px-[50px] animate-[infiniteSlide_60s_linear_infinite] w-max">
                    {currentPartners?.logo?.map((partner, index) => {
                      return (
                        <div
                          key={index}
                          className="relative lg:w-[150px] w-[56px] m-auto lg:h-[150px] h-[56px]"
                        >
                          <Image
                            src={partner}
                            alt="partner"
                            fill
                            className="object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex lg:gap-[100px] gap-[50px] lg:ml-[100px] ml-[50px] animate-[infiniteSlide_60s_linear_infinite] w-max">
                    {currentPartners?.logo?.map((partner, index) => {
                      return (
                        <div
                          key={index}
                          className="relative lg:w-[150px] w-[56px] m-auto lg:h-[150px] h-[56px]"
                        >
                          <Image
                            src={partner}
                            alt="partner"
                            fill
                            className="object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex lg:gap-[100px] gap-[50px] lg:ml-[100px] ml-[50px] animate-[infiniteSlide_60s_linear_infinite] w-max">
                    {currentPartners?.logo?.map((partner, index) => {
                      return (
                        <div
                          key={index}
                          className="relative lg:w-[150px] w-[56px] m-auto lg:h-[150px] h-[56px]"
                        >
                          <Image
                            src={partner}
                            alt="partner"
                            fill
                            className="object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Editable>

      <Modal
        visible={showModal === 'update'}
        title="Edit Partners"
        onClose={closeModal}
      >
        <PartnersForm
          onSubmit={handleSubmitPartners}
          defaults={currentPartners as PartnersInput}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default PartnerSection;
