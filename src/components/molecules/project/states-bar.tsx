import React from 'react';
import Link from 'next/link';
import { paths } from 'config/paths';

import { projectsInfo } from './project-info';
import clsx from 'clsx';

type StatesBarProps = {
  activeState: string;
  isAdmin: boolean;
};

const states = projectsInfo.states;

const StatesBar = ({ activeState, isAdmin }: StatesBarProps) => {
  const prefix = isAdmin ? '/admin' : '';
  return (
    <div className="overflow-x-auto px-[16px]">
      <div className="flex w-max mx-auto justify-center gap-[35px] sm:text-[24px] text-[14px] font-[500] font-mulish">
        {states.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${prefix + paths.project}/${item}`}
              className={clsx(
                activeState === item
                  ? 'text-primary_CTA_Color'
                  : 'text-secondary_text_color',
                'capitalize leading-[50px]'
              )}
            >
              {item}
            </Link>
          );
        })}
        <Link
          href={`${prefix + paths.project}/sponsored`}
          className={clsx(
            activeState === 'sponsored'
              ? 'text-primary_CTA_Color'
              : 'text-secondary_text_color',
            'capitalize leading-[50px]'
          )}
        >
          {'Sponsored Project'}
        </Link>
      </div>
    </div>
  );
};

export default StatesBar;
