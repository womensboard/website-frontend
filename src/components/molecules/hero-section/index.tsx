'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HeroSectionText from './hero-section-text';
import { CarouselSlides } from '@/components/atom';
import { useToggle } from 'hooks';
import { Editable } from '@/components/organism/Editable';
import Modal from '@/components/organism/modal';
import { HeroForm } from '@/components/organism';
import { HeroDetailData, HeroSectionInput } from 'entities/hero';
import { HeroService } from 'services/hero-services';

type HeroSectionProps = {
  page: HeroDetailData['page'];
};

const defaultHeroSectionData: Record<HeroDetailData['page'], HeroSectionInput> =
  {
    home: {
      header: 'Women’s Board Impacting Lives',
      subHeader: '',
      imageURL: [''],
    },
    'un-collaboration': {
      header: 'UN Collaboration',
      subHeader: '',
      imageURL: [''],
    },
    project: {
      header: 'Projects',
      imageURL: [''],
    },
    about: {
      header: 'Empowering the Nigerian woman',
      subHeader: '',
      imageURL: [''],
    },
  };
const HeroSection = (props: HeroSectionProps) => {
  const { page } = props;
  const [visible, toggle] = useToggle();

  const [heroSectionData, setHeroSectionData] = useState(
    defaultHeroSectionData[page]
  );

  useEffect(() => {
    async function setupHeroSection() {
      const { data: heros } = await HeroService.fetchAllHeros();

      const heroData = heros?.find((item) => item.page === page);

      if (heroData) setHeroSectionData(heroData);
    }

    setupHeroSection();
  }, [page]);

  const handleSubmitHero = async (values: HeroSectionInput) => {
    const res = await HeroService.updateHeroSection(page, values);

    if (res.data) {
      setHeroSectionData(res.data);
      toggle();
    }

    return res;
  };

  const { header, subHeader, imageURL } = heroSectionData;

  return (
    <>
      <Editable title="Hero" onEditBtnClick={toggle}>
        <div className="relative z-[-1] scroll-smooth">
          {imageURL.length > 1 && page === 'home' ? (
            <CarouselSlides items={imageURL} perSlideConfig={{ xl: 1 }}>
              {function (item, index) {
                return (
                  <div key={index} className="w-full xl:h-[500px] h-[300px]">
                    <Image
                      src={item}
                      alt="heroSection"
                      fill
                      className="object-cover lg:object-[center_-160px]"
                    />
                  </div>
                );
              }}
            </CarouselSlides>
          ) : (
            <div className="w-full xl:h-[500px] h-[300px]">
              <Image
                src={imageURL[0]}
                alt="heroSection"
                fill
                className="object-cover"
              />
            </div>
          )}

          <HeroSectionText heading={header} subText={subHeader} />
        </div>
      </Editable>

      <Modal title={`Edit ${page} Hero`} visible={visible} onClose={toggle}>
        <HeroForm
          onSubmit={handleSubmitHero}
          onCancel={toggle}
          page={page}
          defaults={heroSectionData}
        />
      </Modal>
    </>
  );
};

export default HeroSection;
