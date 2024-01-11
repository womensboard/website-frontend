'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from '../../atom/section-heading';
import Image from 'next/image';
import { Editable } from '@/components/organism/Editable';
import Modal from '@/components/organism/modal';
import EditGalleryForm, {
  defaultGallery,
  GalleryInput,
} from '@/components/organism/forms/home/edit-gallery-form';
import { GalleryService } from 'services/home/gallery-service';
import { LoadingSpiner } from '@/components/atom/loading-spinner';

type ModalName = 'update';

const Gallery = () => {
  const [showModal, setShowModal] = useState<ModalName | null>(null);

  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState<GalleryInput>(defaultGallery);

  const closeModal = () => {
    setShowModal(null);
  };

  useEffect(() => {
    async function setupGallerySection() {
      const { data: galleryData } = await GalleryService.fetchGallery();
      if (galleryData) setGallery(galleryData as GalleryInput);

      setLoading(false);
    }
    setupGallerySection();
  }, []);

  const handleSubmitGallery = async (values: GalleryInput) => {
    const res = await GalleryService.createGallery(values);

    if (res.data) {
      setGallery(res.data);
      closeModal();
    }

    return res;
  };

  const showEditGallery = () => {
    setShowModal('update');
  };

  return (
    <>
      <Editable title={gallery.subHeader} onEditBtnClick={showEditGallery}>
        {loading && (
          <div>
            Loading Gallery... <LoadingSpiner />
          </div>
        )}
        {!loading && (
          <div className="w-full max-w-[1260px] mx-auto overflow-x-hidden scroll-smooth lg:py-[70px] p-[24px] mb-[24px] px-0">
            <SectionHeading heading="Gallery" />

            <div className="lg:mt-[48px] mt-[24px] px-[17px] xl:px-[34px] overflow-hidden flex">
              <div className="flex items-center justify-center gap-[17px] xl:gap-[34px] animate-[infiniteSlide_180s_linear_infinite]">
                {gallery.imageURL?.map((gallery, index) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-[0px_24px_0px_24px] xl:w-[450px] lg:w-[450px] w-[155px] xl:h-[450px] lg:h-[450px] h-[155px] relative border-secondary_color "
                  >
                    <div className="xl:w-[450px] lg:w-[450px] w-[155px] xl:h-[450px] lg:h-[450px] h-[155px] md:top-[12px] top-[5px] md:left-[12px] left-[5px] relative">
                      <Image
                        src={gallery}
                        alt="gallery"
                        fill
                        className="object-cover rounded-[0px_24px_0px_24px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-[17px] xl:gap-[34px] ml-[17px] xl:ml-[34px] animate-[infiniteSlide_180s_linear_infinite]">
                {gallery.imageURL?.map((gallery, index) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-[0px_24px_0px_24px] xl:w-[450px] lg:w-[450px] w-[155px] xl:h-[450px] lg:h-[450px] h-[155px] relative border-secondary_color "
                  >
                    <div className="xl:w-[450px] lg:w-[450px] w-[155px] xl:h-[450px] lg:h-[450px] h-[155px] md:top-[12px] top-[5px] md:left-[12px] left-[5px] relative">
                      <Image
                        src={gallery}
                        alt="gallery"
                        fill
                        className="object-cover rounded-[0px_24px_0px_24px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Editable>

      <Modal
        title="Edit Gallery"
        visible={showModal === 'update'}
        onClose={closeModal}
      >
        <EditGalleryForm
          onClose={closeModal}
          defaults={gallery as GalleryInput}
          onSubmit={handleSubmitGallery}
        />
      </Modal>
    </>
  );
};

export default Gallery;
