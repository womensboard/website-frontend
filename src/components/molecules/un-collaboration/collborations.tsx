import React from 'react';
import Heading from './heading';
import clsx from 'clsx';
import CollaborationPicker from './collaboration-picker';
import { CollaborationItem } from 'config/collaborations';

const backgroundConfig = {
  red: 'bg-secondary_color',
  white: 'bg-white',
};

interface CollaboraionsProps {
  heading: string;
  subtext: string;
  background: keyof typeof backgroundConfig;
  onItemClick?: (index: number) => void;
  onAddNewYear?: () => void;
  collaborations: CollaborationItem[];
}

const Collborations = (props: CollaboraionsProps) => {
  const {
    heading,
    subtext,
    background,
    onItemClick,
    onAddNewYear,
    collaborations,
  } = props;

  return (
    <div className={clsx(backgroundConfig[background])}>
      <div className="max-w-[1200px] mx-auto font-mulish pt-[72px] pb-[56px] px-[16px]">
        <Heading heading={heading} subtext={subtext} />

        <CollaborationPicker
          onItemClick={onItemClick}
          collaborations={collaborations}
          onAddNewYear={onAddNewYear}
        />
      </div>
    </div>
  );
};

export default Collborations;
