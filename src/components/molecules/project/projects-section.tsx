import React, { useEffect, useState } from 'react';

import { Project } from './project-info';
import ProjectContent from './project-content';
import { Editable } from '@/components/organism/Editable';
import { ProjectsService } from 'services/projects-services';

type ProjectsSectionProps = {
  activeState: string;
  onEditProject: (project: Project) => void;
  projects: Project[];
};

const ProjectsSection = ({
  activeState,
  onEditProject,
  projects,
}: ProjectsSectionProps) => {
  const [allProjects, setAllProjects] = useState(projects);
  const handleDelete = async (projectId: string) => {
    const res = await ProjectsService.deleteProject(projectId);

    if (res.statusCode === 200) {
      setAllProjects((items) => items.filter((item) => item.id !== projectId));
    }
  };

  useEffect(() => {
    setAllProjects(projects);
  }, [projects]);

  return (
    <div className="px-[16px] py-[32px] lg:my-[64px] mx-auto space-y-[40px] w-full flex flex-col justify-center">
      {allProjects
        .filter(
          (project) =>
            (project.sponsored && activeState === 'sponsored') ||
            (!project.sponsored && activeState === project.location)
        )
        .map((project, index) => {
          const isReversed = index % 2 === 1;

          return (
            <Editable
              title="Project"
              onEditBtnClick={() => onEditProject(project)}
              onDeleteBtnClick={() => handleDelete(project.id as string)}
              key={index}
            >
              <ProjectContent project={project} rightAlign={isReversed} />
            </Editable>
          );
        })}
    </div>
  );
};

export default ProjectsSection;
