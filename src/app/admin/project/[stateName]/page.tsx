'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Project from '@/pages/project';

const AdminStateProject = () => {
  const pathName = usePathname();
  const stateName = pathName?.split('/')[3];

  if (typeof stateName === 'string') {
    return <Project stateName={stateName} isAdmin />;
  }
  <Project isAdmin />;
};

export default AdminStateProject;
