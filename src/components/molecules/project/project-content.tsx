import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';

import { Project } from './project-info';
import Button from '@/components/atom/button';
import { paths } from 'config/paths';

type ProjectContentProps = {
  project: Project;
  rightAlign: boolean;
};

const ProjectContent = ({ project, rightAlign }: ProjectContentProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center font-mulish mx-auto gap-[40px] lg:gap-[40px] lg:my-[66px]',
        rightAlign ? 'lg:flex-row-reverse justify-end' : 'lg:flex-row'
      )}
    >
      <div className="relative h-[446px] w-full max-w-[446px]">
        <Image
          src={project.imageURL}
          alt="project picture"
          fill
          className="object-cover"
        />
      </div>

      <div className="lg:flex lg:flex-col lg:items-start justify-center">
        <div
          className={clsx(
            'text-left w-full max-w-[570px]',
            rightAlign ? 'text-left' : 'text-right'
          )}
        >
          <h3 className="text-[18px] font-bold text-primary_CTA_Color">
            {project.title}
          </h3>
          <p className="text-[18px] text-justify font-normal mt-[12px] mb-[32px] lg:mb-[48px] line-clamp-[10]">
            {project.description}
          </p>

          <div className="w-fit inline-block">
            <Button
              href={project.visitURL || `${paths.project}/d/${project.id}`}
              type="primary"
              size="md"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
