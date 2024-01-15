export type Project = {
  title: string;
  description: string;
  donateLink: string;
  location: ProjectLocation;
  imageURL: string;
  sponsored: boolean;
  visitURL: string;
  id?: string;
};

export type ProjectLocation = 'lagos' | 'oyo' | 'ogun' | 'enugu' | 'edo';

type ProjectsInfo = {
  projects: Project[];
  states: ProjectLocation[];
};

export const projectsInfo: ProjectsInfo = {
  states: ['lagos', 'oyo', 'ogun', 'enugu', 'edo'],
  projects: [],
};
