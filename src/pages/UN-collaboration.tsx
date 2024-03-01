'use client';

import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/molecules/footer';
import YouthVoices from '@/components/molecules/un-collaboration/youth-voices';
import Modal from '@/components/organism/modal';
import { CollaborationForm } from '@/components/organism/forms/UN-collaboration';
import HeroSection from '@/components/molecules/hero-section';
import { UNCollaborationService } from 'services/un-collaboration/un-collaboration-service';
import Collborations from '@/components/molecules/un-collaboration/collborations';
import { CollaborationItem, CollaborationData } from 'config/collaborations';

type UNCollaborationProps = {
  isAdmin: boolean;
};

type Section = 'contributions' | 'conferences' | 'youth voices';
type ModalNames = 'create' | 'update';

const UNCollaboration = ({ isAdmin = false }: UNCollaborationProps) => {
  const [sections, setSections] = useState<Section | null>(null);
  const [modalType, setModalType] = useState<ModalNames | null>(null);

  const [conferences, setConferences] = useState<CollaborationItem[]>([]);
  const [contributions, setContribution] = useState<CollaborationItem[]>([]);

  const [currentContribution, setCurrentContribution] =
    useState<CollaborationData | null>();

  const [currentConferences, setCurrentConferences] =
    useState<CollaborationData | null>();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const showContributionModal = useCallback(
    (section: Section, type: ModalNames, index: number | null = null) => {
      if (!isAdmin) return;
      setCurrentContribution(contributions[index as number]);
      setSelectedIndex(index);
      setSections(section);
      setModalType(type);
    },
    [contributions, isAdmin]
  );

  const showConferencesModal = useCallback(
    (section: Section, type: ModalNames, index: number | null = null) => {
      if (!isAdmin) return;
      setCurrentConferences(conferences[index as number]);
      setSelectedIndex(index);
      setSections(section);
      setModalType(type);
    },
    [conferences, isAdmin]
  );

  const closeModal = useCallback(() => {
    setSections(null);
  }, []);

  useEffect(() => {
    async function setupConferences() {
      const { data: collaborationData } = await UNCollaborationService.fetch(
        'conference'
      );

      const conferencesData = collaborationData?.filter(
        (item) => item.section === 'conference'
      );

      if (conferencesData) setConferences(conferencesData);
    }

    setupConferences();
  }, []);

  useEffect(() => {
    async function setupContributions() {
      const { data: collaborationData } = await UNCollaborationService.fetch(
        'contribution'
      );

      const contributionData = collaborationData?.filter(
        (item) => item.section === 'contribution'
      );

      if (contributionData) setContribution(contributionData);
    }

    setupContributions();
  }, []);

  const handleSubmit = useCallback(
    async (values: CollaborationItem) => {
      let res;

      if (
        sections === 'conferences' &&
        modalType === 'create' &&
        typeof selectedIndex !== 'number'
      ) {
        res = await UNCollaborationService.create('conference', values);

        const newConferences = res.data;

        if (newConferences) {
          setConferences((conferences) => [...conferences, newConferences]);
        }
      } else if (sections === 'conferences' && modalType === 'update') {
        res = await UNCollaborationService.update(
          currentConferences?.id as string,
          'conference',
          values
        );

        const updatedConference = res.data;

        if (updatedConference) {
          setConferences((conferences) =>
            conferences.map((conference) => {
              if (conference.id === updatedConference.id) {
                return updatedConference;
              }

              return conference;
            })
          );
        }
      }

      if (
        sections === 'contributions' &&
        modalType === 'create' &&
        typeof selectedIndex !== 'number'
      ) {
        res = await UNCollaborationService.create('contribution', values);

        const newContribution = res.data;

        if (newContribution) {
          setContribution((contribution) => [...contribution, newContribution]);
        }
      } else if (sections === 'contributions' && modalType === 'update') {
        res = await UNCollaborationService.update(
          currentContribution?.id as string,
          'contribution',
          values
        );

        const updatedContribution = res.data;

        if (updatedContribution) {
          setContribution((contributions) =>
            contributions.map((contribution) => {
              if (contribution.id === updatedContribution.id) {
                return updatedContribution;
              }

              return contribution;
            })
          );
        }
      }

      if (res?.data) {
        closeModal();
      }

      return res;
    },
    [
      sections,
      modalType,
      selectedIndex,
      currentConferences?.id,
      currentContribution?.id,
      closeModal,
    ]
  );

  return (
    <div className={clsx(isAdmin && 'group is-admin')}>
      <Navbar isAdmin={isAdmin} />
      <HeroSection page="un-collaboration" />
      <Collborations
        heading="Conferences"
        subtext="Women's Board participates in UN-related fora open to civil society, both in Nigeria and in other countries. Its representatives in New York, Geneva and Vienna often attend conferences and events taking place in these locations. This includes:"
        background="red"
        collaborations={conferences}
        onItemClick={(index) =>
          showConferencesModal('conferences', 'update', index)
        }
        onAddNewYear={() => showConferencesModal('conferences', 'create')}
      />

      <Collborations
        heading="Contributions"
        subtext="The Women’s Board has participated in various conferences, submitted written collaborations and presented papers on topics related to women, children and different aspects of development."
        background="white"
        onItemClick={(index) =>
          showContributionModal('contributions', 'update', index)
        }
        collaborations={contributions}
        onAddNewYear={() => showContributionModal('contributions', 'create')}
      />

      <YouthVoices />
      <Footer isAdmin={isAdmin} />
      <Modal
        visible={
          sections === 'contributions' && typeof selectedIndex === 'number'
        }
        title="Edit Contribution"
        onClose={closeModal}
      >
        <CollaborationForm
          onCancel={closeModal}
          onSubmit={handleSubmit}
          defaults={currentContribution as CollaborationItem}
          section="contribution"
        />
      </Modal>

      <Modal
        visible={sections === 'contributions' && selectedIndex === null}
        title="Add New Contribution"
        onClose={closeModal}
      >
        <CollaborationForm
          onCancel={closeModal}
          onSubmit={handleSubmit}
          section="contribution"
        />
      </Modal>

      <Modal
        visible={
          sections === 'conferences' && typeof selectedIndex === 'number'
        }
        title="Edit Conference"
        onClose={closeModal}
      >
        <CollaborationForm
          onCancel={closeModal}
          onSubmit={handleSubmit}
          section="conference"
          defaults={currentConferences as CollaborationItem}
        />
      </Modal>

      <Modal
        visible={sections === 'conferences' && selectedIndex === null}
        title="Add New Conference"
        onClose={closeModal}
      >
        <CollaborationForm
          onCancel={closeModal}
          onSubmit={handleSubmit}
          section="conference"
        />
      </Modal>
    </div>
  );
};

export default UNCollaboration;
