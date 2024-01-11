import Tabs from '@/components/layout/about/tab';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import HeroSection from '@/components/molecules/hero-section';

import clsx from 'clsx';
import React from 'react';

type AboutProps = {
  isAdmin: boolean;
};

export type ModalName = 'hero' | 'features' | 'strategy' | 'team';

const About = ({ isAdmin = false }: AboutProps) => {
  return (
    <>
      <div className={clsx(isAdmin && 'group is-admin')}>
        <Navbar isAdmin={isAdmin} />

        <HeroSection page="about" />

        <Tabs />

        <Footer />
      </div>
    </>
  );
};

export default About;
