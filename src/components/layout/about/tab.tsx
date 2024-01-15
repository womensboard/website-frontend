'use client';

import React, { ReactNode, useState } from 'react';
import WhoWeAre from '@/components/layout/about/who-we-are';
import Supporters from '@/components/layout/about/supporters';
import OurTeam from '@/components/molecules/about/our-team/our-team';
import clsx from 'clsx';

type AboutTabs = {
  title: string;
  content: ReactNode;
};

const aboutTabs: AboutTabs[] = [
  {
    title: 'Who we are',
    content: <WhoWeAre />,
  },
  {
    title: 'Team',
    content: <OurTeam />,
  },
  {
    title: 'Supporters',
    content: <Supporters />,
  },
];

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState(aboutTabs[0]);

  const hanldeContentChange = (tab: AboutTabs) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="flex items-center justify-around font-mulish lg:text-[24px] text-secondary_text_color font-[400] bg-[#F2F2F2]">
        {aboutTabs.map((tab, index) => {
          const currentTabClsx =
            currentTab.title === tab.title && 'text-[#FF9191] font-[700]';

          return (
            <button
              key={index}
              onClick={() => hanldeContentChange(tab)}
              className={clsx(currentTabClsx, 'py-4')}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {currentTab.content}
    </>
  );
};

export default Tabs;
