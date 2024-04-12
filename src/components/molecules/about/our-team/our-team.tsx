import React from 'react';
import { TeamDescription } from './team-description';
import GoverningCouncil from './governing-council';
import ManagementTeam from './management-team';

const OurTeam = () => {
  return (
    <div className="xl:text-center text-justify xl:pb-[60px] pb-[16px]">
      <TeamDescription />

      <div className="mt-[60px]">
        <GoverningCouncil />
        <ManagementTeam />
      </div>
    </div>
  );
};

export default OurTeam;
