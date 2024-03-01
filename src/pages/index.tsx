import React from 'react';
import clsx from 'clsx';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import Gallery from '@/components/molecules/home/gallery';
import HeroSection from '@/components/molecules/hero-section';
import Newsletter from '@/components/molecules/home/newsletter';
import ValueMetricsSection from '@/components/molecules/home/value-metrics-section';
import EventsCardSection from '@/components/molecules/home/news-and-events-carousel/events-section';
import PartnerSection from '@/components/molecules/home/partner-section';
import AreasOfActivities from '@/components/layout/areas-of-activities';

type HomeProps = {
  isAdmin: boolean;
};

const Home = ({ isAdmin = false }: HomeProps) => {
  return (
    <div className="relative">
      <div className={clsx(isAdmin && 'group is-admin')}>
        <Navbar isAdmin={isAdmin} />
        <HeroSection page="home" />

        <ValueMetricsSection />

        <AreasOfActivities />

        <EventsCardSection isAdmin={isAdmin} />

        <PartnerSection />

        <Gallery />

        <Newsletter />

        <Footer isAdmin={isAdmin} />
      </div>
    </div>
  );
};
export default Home;
