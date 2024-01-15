export type CollaborationItem = {
  id: string;
  section: 'contribution' | 'conference';
  year: number;
  activities: string[];
};

export type CollaborationData = CollaborationItem & {
  id: string;
};
