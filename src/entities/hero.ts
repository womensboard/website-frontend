export type HeroSectionInput = {
  header: string;
  subHeader?: string;
  imageURL: string[];
};

export type HeroDetailData = HeroSectionInput & {
  page: 'about' | 'home' | 'project' | 'un-collaboration';
};
