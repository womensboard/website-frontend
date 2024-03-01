import React from 'react';
import { useRouter } from 'next/router';

import ProjectPage from './';

const StateProject = () => {
  const router = useRouter();
  const stateName = router.query.stateName;

  if (typeof stateName === 'string') {
    return <ProjectPage stateName={stateName} isAdmin={false} />;
  }
  <ProjectPage isAdmin={false} />;
};

export default StateProject;
