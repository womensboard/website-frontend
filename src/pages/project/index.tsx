'use client';

import React, { useState, useEffect, Dispatch } from 'react';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import StatesBar from '@/components/molecules/project/states-bar';
import ProjectsSection from '@/components/molecules/project/projects-section';
import clsx from 'clsx';
import Modal from '@/components/organism/modal';
import { ProjectForm } from '@/components/organism/forms/project/edit-project-form';
import {
  Project,
  projectsInfo,
} from '@/components/molecules/project/project-info';
import { ProjectsService } from 'services/projects-services';
import { FaPlus } from 'react-icons/fa';
import HeroSection from '@/components/molecules/hero-section';

type ProjectProps = { stateName?: string; isAdmin: boolean };

type ModalName = 'update' | 'create';

const defaultHeroObject: Project = {
  title: 'Wavecrest College of Hospitality',
  location: 'lagos',
  donateLink: '',
  imageURL: '/assets/images/projects/wavecrest-college.png',
  sponsored: false,
  description:
    'Wavecrest College of Hospitality is the premier private Monotechnic in the country. The College empowers beneficiaries to obtain Hospitality Education with emphasis on broad based knowledge, skills specialization and high ethical standards – offering immediate employment with economic independence. The College is accredited by the National Board for Technical Education (NBTE) as a Monotechnic in 1998.',
  visitURL: '',
};

const ProjectSection = ({ stateName = 'lagos', isAdmin }: ProjectProps) => {
  const [modalName, setModalName]: [
    ModalName | undefined,
    Dispatch<ModalName | undefined>
  ] = useState();

  const [currentProject, setCurrentProject] =
    useState<Project>(defaultHeroObject);

  const [projects, setProjects] = useState<Project[]>(projectsInfo.projects);

  useEffect(() => {
    async function initProjects() {
      const { data: projectsData } = await ProjectsService.fetchProjects();
      if (projectsData) {
        setProjects(projectsData);
      }
    }
    initProjects();
  }, []);

  function showModal(modalName: ModalName, project?: Project) {
    if (project) setCurrentProject(project);
    setModalName(modalName);
  }

  function closeModal() {
    setModalName(undefined);
  }

  const handleSubmitProject = async (values: Project) => {
    let res;
    if (modalName === 'create') {
      res = await ProjectsService.createProject(values);
      const newItem = res.data;
      if (newItem) setProjects((items) => [...items, newItem]);
    } else {
      res = await ProjectsService.updateProject(
        currentProject?.id as string,
        values
      );

      const updatedItem = res.data;
      if (updatedItem)
        setProjects((items) =>
          items.map((item) => {
            if (item.id === updatedItem.id) return updatedItem;
            return item;
          })
        );
    }

    if (res.data) {
      closeModal();
    }

    return res;
  };

  return (
    <div className={clsx(isAdmin && 'group is-admin')}>
      <Navbar isAdmin={isAdmin} />

      <HeroSection page="project" />

      <StatesBar activeState={stateName} isAdmin={isAdmin} />

      {projects.length < 1 ? (
        <p className="italic my-4 text-center"> No Project</p>
      ) : (
        <ProjectsSection
          activeState={stateName}
          projects={projects}
          onEditProject={(project) => showModal('update', project)}
        />
      )}

      <button
        type="button"
        className="bg-admin_overlay_bg_color text-admin_font_size hover:border-gray-300 text-white h-60 w-full hidden justify-center items-center  group-[.is-admin]:flex"
        onClick={() => showModal('create')}
      >
        <div className="flex ">
          <FaPlus className="mr-5" />
          <span> Add Project</span>
        </div>
      </button>

      <Footer isAdmin={isAdmin} />

      <Modal
        visible={modalName === 'update'}
        title={'Edit Project'}
        onClose={closeModal}
        addModalButtonTitle="Project"
      >
        <ProjectForm
          onSubmit={handleSubmitProject}
          defaults={currentProject}
          onClose={closeModal}
        />
      </Modal>
      <Modal
        visible={modalName === 'create'}
        title={'Add Project'}
        onClose={closeModal}
      >
        <ProjectForm onSubmit={handleSubmitProject} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ProjectSection;
