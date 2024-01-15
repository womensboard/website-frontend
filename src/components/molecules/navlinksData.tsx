'use client';
import { paths } from 'config/paths';

export type Navlink = {
  title: string;
  href: string;
  adminHref: string;
};

export const navlinksData: Navlink[] = [
  {
    title: 'About',
    href: paths.about,
    adminHref: paths.adminAbout,
  },
  {
    title: 'Projects',
    href: paths.project,
    adminHref: paths.adminProject,
  },
  {
    title: 'UN Collaboration',
    href: paths.UNCollaboration,
    adminHref: paths.adminUNCollaboration,
  },
  {
    title: 'Contact',
    href: paths.contact,
    adminHref: paths.adminContact,
  },
];
