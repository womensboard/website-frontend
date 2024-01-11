import React from 'react';

type TeamDetailsProps = {
  name: string;
};

const TeamDetails = (props: TeamDetailsProps) => {
  const { name } = props;

  return (
    <li className="xl:my-[24px] text-[10px] text-left xl:text-[24px] whitespace-pre-wrap text-primary_text_color list-disc">
      {name}
    </li>
  );
};

export default TeamDetails;
