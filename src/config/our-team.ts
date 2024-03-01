export type TeamDetailsType = {
  id?: string;
  name: string;
  updatedAt?: string;
  createdAt?: string;
};

export type TeamDetailsData = TeamDetailsType & {
  id: string;
};

type TeamTypes = {
  heading: TeamHeading;
  details: string[];
};

type TeamHeading = 'Management Team' | 'Governing Council';

export const teams: TeamTypes[] = [
  {
    heading: 'Governing Council',
    details: [
      'Mrs. Rose Ogbechie',

      'Mrs. Ayo Sanwo',

      'Ms. Helen Lawson',

      'Ms. Rosario Monfort',

      'Dr. Nneka Iloanusi',

      'Mrs. Edna Dafe',
    ],
  },
  {
    heading: 'Management Team',
    details: [
      'Mrs. Edna Dafe - Director',

      'Ms. Geraldine Imhabekhai',

      'Mrs. Angela Da-Silva',
    ],
  },
];
