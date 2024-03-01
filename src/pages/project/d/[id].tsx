import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import Detail from '@/components/molecules/project/detail';
import { Project } from '@/components/molecules/project/project-info';
import { ProjectsService } from 'services/projects-services';

const ProjectDetails = () => {
  const router = useRouter();
  const projectID = router.query.id;

  const [project, setProject] = useState({} as Project);

  useEffect(() => {
    async function setupPage() {
      if (typeof projectID === 'string') {
        const { data: projects } = await ProjectsService.fetchProjects();
        const projectData = projects?.find((item) => item.id === projectID);
        if (projectData) setProject(projectData);
      }
    }
    setupPage();
  }, [projectID]);

  return (
    <div className="font-mulish">
      <Navbar />

      <Detail {...project} />

      <Footer />
    </div>
  );
};

export default ProjectDetails;
