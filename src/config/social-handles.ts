const linkedIn = '/assets/images/linkedin.svg';
const twitter = '/assets/images/twitter.svg';
const facebook = '/assets/images/facebook.svg';
const instagram = '/assets/images/ig.svg';

type SocialHandle = {
  icon: string;
  href: string;
};

export const socials: SocialHandle[] = [
  {
    icon: linkedIn,
    href: 'https://www.linkedin.com/company/wb-ecs/?originalSubdomain=ng',
  },

  {
    icon: facebook,
    href: 'https://facebook.com/womensboard.com.ng',
  },

  {
    icon: twitter,
    href: 'https://twitter.com/women_board',
  },

  {
    icon: instagram,
    href: 'https://www.instagram.com/womens_board/',
  },
];
