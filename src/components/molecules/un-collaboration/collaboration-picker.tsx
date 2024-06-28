import { CollaborationItem } from 'config/collaborations';
import React, { useEffect, useState } from 'react';
import YearButton from './year-button';
import CollaborationLists from './collaboration-lists';
import clsx from 'clsx';

type CollaborationPickerProps = {
  onItemClick?: (index: number) => void;
  onAddNewYear?: () => void;
  collaborations: CollaborationItem[];
};

const CollaborationPicker = (props: CollaborationPickerProps) => {
  const { onItemClick, onAddNewYear, collaborations } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (collaborations.length > 0) {
      setSelectedIndex(0);
    }
  }, [collaborations]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    onItemClick?.(index);
  };

  const selectedItem = collaborations[selectedIndex];

  const activities = String(selectedItem?.activities);
  const activitiesArr = activities.split('\n\n');

  return (
    <div className="mt-[32px]">
      <div className="grid lg:grid-cols-10 md:grid-cols-8 grid-cols-5 gap-[15px] xl:gap-[33px] p-[16px] lg:p-[24px_48px]">
        <button
          onClick={onAddNewYear}
          className={clsx(
            'border-[1px] cursor-pointer text-primary_CTA_Color',
            'rounded-[8px] border-primary_CTA_Color h-fit lg:text-[20px] text-[14px] font-[500] lg:w-[80px] w-[50px] lg:py-[12px] text-center p-[8px]',
            'group-[.is-admin]:inline-block hidden',
            onAddNewYear ? '' : 'hidden'
          )}
        >
          +
        </button>

        {collaborations
          .sort((a: CollaborationItem, b: CollaborationItem) => b.year - a.year)
          .filter(
            (collaboration) => collaboration.section === selectedItem.section
          )
          .map((collaboration, index) => {
            const { year } = collaboration;
            const isCurrentSelectedYear = index === selectedIndex;

            return (
              <YearButton
                key={index}
                year={year}
                handleYearClick={() => handleItemClick(index)}
                isCurrentSelectedYear={isCurrentSelectedYear}
              />
            );
          })}
      </div>

      <div className="mt-[40px]">
        <CollaborationLists
          year={selectedItem?.year}
          contents={activitiesArr}
        />
      </div>
    </div>
  );
};

export default CollaborationPicker;
